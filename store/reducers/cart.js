import CartItem from '../../data/cart-item';
import { ADD_TO_CART, DELETE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let addOrUpdateCartItem;
      if (state.items[addedProduct.id]) {
        addOrUpdateCartItem = new CartItem(
          state.items[addedProduct.id].qty + 1,
          prodTitle,
          prodPrice,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        addOrUpdateCartItem = new CartItem(1, prodTitle, prodPrice, prodPrice);
      }
      return {
        items: { ...state.items, [addedProduct.id]: addOrUpdateCartItem },
        totalAmount: state.totalAmount + prodPrice
      };

    case DELETE_FROM_CART:
      let updatedCartItems;
      const selectedItem = state.items[action.pid];
      const currentItemQty = selectedItem.qty;
      if (currentItemQty > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.qty - 1,
          selectedItem.productTitle,
          selectedItem.productPrice,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice
      };

    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
