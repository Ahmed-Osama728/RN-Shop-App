import { ADD_ORDER, FETCH_ORDERS } from '../actions/orders';
import Order from '../../models/orders';
const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalPrice,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
  }
  return state;
};
