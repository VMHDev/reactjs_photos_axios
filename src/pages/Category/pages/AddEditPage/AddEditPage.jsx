import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import CategoryForm from 'pages/Category/components/CategoryForm';

import { showLoading, showModalOk } from 'redux/appSlice';
import { addCategory } from 'redux/categorySlice';
import { timeout } from 'utils/helper';
import { useCategoryUpdate } from 'hooks/axios/apiCategories';

import { PATH_CATEGORIES } from 'constants/route';
import { NOTIFICATION, UPDATE_FAILED } from 'constants/modal';

import './styles.scss';

const AddEditPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams();
  const isAddMode = categoryId === 'add' || !categoryId ? true : false;

  const editedCategory = useSelector((state) => {
    const foundCategory = state.categories.data.find(
      (x) => x._id.toString() === categoryId
    );
    return foundCategory;
  });

  const maxCategories = useSelector((state) => {
    let max = Math.max.apply(
      Math,
      state.categories.data.map((object) => object._id)
    );
    return max;
  });

  const initialValues = isAddMode
    ? {
        _id: maxCategories + 1,
        name: '',
      }
    : editedCategory;

  // Redirect when missing state
  useEffect(() => {
    if (!editedCategory) {
      history.push(PATH_CATEGORIES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedCategory]);

  // Handle events
  const [apiCategoryUpdate] = useCategoryUpdate();

  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    let response = null;
    try {
      if (isAddMode) {
        const action = addCategory(values);
        dispatch(action);
        await timeout(1000);
      } else {
        // Call Api
        response = await apiCategoryUpdate(values);
      }
    } catch (error) {
      console.log(error);
    }

    // Handle response
    if (response?.success) {
      history.push(PATH_CATEGORIES);
    } else {
      dispatch(
        showModalOk({
          title: NOTIFICATION,
          content: response?.message ? response?.message : UPDATE_FAILED,
        })
      );
    }
    dispatch(showLoading(false));
  };

  return (
    <div className='category-edit'>
      <Banner
        title={isAddMode ? 'Add new category 🛍️' : 'Update category 🛍️'}
      />

      <div className='category-edit__form'>
        <CategoryForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
