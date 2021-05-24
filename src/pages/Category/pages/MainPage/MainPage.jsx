import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Tooltip } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import ModalYesNoCancel from 'components/Modal/ModalYesNoCancel';
import CategoryTable from 'pages/Category/components/CategoryTable';
import { removeCategory } from 'redux/categorySlice';
import { showModalOk, showModalYesNoCancel } from 'redux/appSlice';
import { useCategoryGetAll } from 'hooks/axios/apiCategories';

import {
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
  PATH_CATEGORIES_ADD,
} from 'constants/route';
import {
  NOTIFICATION,
  CONFIRM,
  DELETE_FAILED,
  DELETE_CONFIRM,
} from 'constants/modal';
import Images from 'constants/images';

const MainPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [categorySelected, setCategorySelected] = useState(null);

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Get all category
  const [apiCategoryGetAll] = useCategoryGetAll();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      // Call API
      const response = await apiCategoryGetAll();
      console.log('response', response);
      if (response.success) {
        const data = response.categories ? response.categories : [];
        setCategories(data);
      }
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hander Events
  const handleCategoryEditClick = (category) => {
    if (userLogin) {
      history.push(PATH_CATEGORIES + category.id);
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Edit' },
      });
    }
  };

  const handleCategoryRemoveClick = (category) => {
    if (userLogin) {
      setCategorySelected(category);
      dispatch(
        showModalYesNoCancel({
          title: CONFIRM,
          content: DELETE_CONFIRM,
        })
      );
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Remove' },
      });
    }
  };

  // Modal
  const handleClickYes = () => {
    try {
      const removePhotoId = categorySelected.id;
      const action = removeCategory(removePhotoId);
      dispatch(action);
      // Close modal
      dispatch(showModalYesNoCancel({ title: '', content: '' }));
    } catch (error) {
      dispatch(showModalOk({ title: NOTIFICATION, content: DELETE_FAILED }));
      console.log(error);
    }
  };

  const handleClickNo = () => {
    dispatch(showModalYesNoCancel({ title: '', content: '' }));
  };

  // Render GUI
  const iconStyles = { color: '#0275d8', fontSize: '3.0em' };
  const tooltipStyles = { fontSize: '20px' };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const pathAdd = userLogin ? PATH_CATEGORIES_ADD : PATH_USER_LOGIN;

  return (
    <Fragment>
      <div className='photo-main text-right'>
        <Banner title='List category 🎉' backgroundUrl={Images.PINK_BG} />

        <Container>
          <div className='py-5'>
            <Link
              to={{
                pathname: pathAdd,
                state: { type: 'Category_Add' },
              }}
              id='AddNewCategory'>
              <BsPlusSquareFill style={iconStyles} />
            </Link>
            <Tooltip
              placement='left'
              isOpen={tooltipOpen}
              target='AddNewCategory'
              toggle={toggle}
              style={tooltipStyles}>
              Add new photo
            </Tooltip>
          </div>

          <CategoryTable
            categoryList={categories}
            onCategoryEditClick={handleCategoryEditClick}
            onCategoryRemoveClick={handleCategoryRemoveClick}
          />
        </Container>
      </div>
      <ModalYesNoCancel
        onClickYes={handleClickYes}
        onClickNo={handleClickNo}></ModalYesNoCancel>
    </Fragment>
  );
};

MainPage.propTypes = {};

export default MainPage;
