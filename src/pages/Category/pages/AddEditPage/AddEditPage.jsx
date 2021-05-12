import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'redux/appSlice';
import { addCategory, updateCategory } from 'redux/categorySlice';
import { useHistory, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import CategoryForm from 'pages/Category/components/CategoryForm';
import { timeout } from 'utils/helper';

import { PATH_CATEGORIES } from 'constants/route';

import './styles.scss';

const AddEditPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams();
  const isAddMode = categoryId === 'add' || !categoryId ? true : false;

  const editedCategory = useSelector((state) => {
    const foundCategory = state.categories.find(
      (x) => x.id.toString() === categoryId
    );
    return foundCategory;
  });

  const maxCategories = useSelector((state) => {
    let max = Math.max.apply(
      Math,
      state.categories.map((object) => object.id)
    );
    return max;
  });

  const initialValues = isAddMode
    ? {
        id: maxCategories + 1,
        name: '',
      }
    : editedCategory;

  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    try {
      if (isAddMode) {
        const action = addCategory(values);
        dispatch(action);
        await timeout(1000);
      } else {
        const action = updateCategory(values);
        dispatch(action);
        await timeout(1000);
      }
      history.push(PATH_CATEGORIES);
    } catch (error) {
      console.log(error);
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
