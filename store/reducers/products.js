import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT
} from '../actions/product';
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        availableProducts: action.payload,
        userProducts: action.userProducts
      };
    case DELETE_PRODUCT:
      const products = { ...state };
      return {
        ...state,
        availableProducts: products.availableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        userProducts: products.userProducts.filter(
          (prod) => prod.id !== action.pid
        )
      };

    case UPDATE_PRODUCT:
      let updatedUserProds = [...state.userProducts];
      let updatedAvailableProds = [...state.availableProducts];

      const updatedUserProdIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.prodId
      );
      const updatedAvailableProdIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.prodId
      );

      const updatedUserProd = new Product(
        action.prodId,
        action.productData.ownerId,
        action.productData.imageUrl,
        action.productData.title,
        action.productData.description,
        updatedUserProds[updatedUserProdIndex].price
      );
      const updatedAvailabeProd = new Product(
        action.productData.prodId,
        action.productData.ownerId,
        action.productData.imageUrl,
        action.productData.title,
        action.productData.description,
        updatedUserProds[updatedAvailableProdIndex].price
      );

      updatedUserProds[updatedUserProdIndex] = updatedUserProd;
      updatedAvailableProds[updatedAvailableProdIndex] = updatedAvailabeProd;

      return {
        ...state,
        availableProducts: updatedAvailableProds,
        userProducts: updatedUserProds
      };

    case ADD_PRODUCT:
      const addedProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.imageUrl,
        action.productData.title,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(addedProduct),
        userProducts: state.userProducts.concat(addedProduct)
      };
  }

  return state;
};
