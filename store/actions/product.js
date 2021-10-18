import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://re-shop-app-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('There is somthing wrong occured!!');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].imageUrl,
            resData[key].title,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: FETCH_PRODUCTS,
        payload: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId)
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId, getState) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://re-shop-app-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error('there is somthing wrong occured');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    });
  };
};

export const updateProduct = (prodId, imageUrl, title, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl,
        title,
        description,
        ownerId: userId
      })
    };

    const response = await fetch(
      `https://re-shop-app-default-rtdb.firebaseio.com/products/${prodId}.json?auth=${token}`,
      config
    );

    if (!response.ok) {
      throw new Error('there is something worng occured');
    }

    const resData = await response.json();

    dispatch({
      type: UPDATE_PRODUCT,
      prodId,
      productData: {
        imageUrl,
        title,
        description,
        ownerId: resData.ownerId
      }
    });
  };
};
export const addProduct = (imageUrl, title, description, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl,
        title,
        description,
        price,
        ownerId: userId
      })
    };

    const response = await fetch(
      `https://re-shop-app-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      config
    );
    const resData = await response.json();
    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        imageUrl,
        title,
        description,
        price,
        ownerId: resData.ownerId
      }
    });
  };
};
