import Orders from '../../models/orders';

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://re-shop-app-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error('There is something wrong occured');
      }

      const laodedOrders = [];

      for (const key in resData) {
        laodedOrders.push(
          new Orders(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            resData[key].date
          )
        );
      }

      dispatch({
        type: FETCH_ORDERS,
        payload: laodedOrders
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://re-shop-app-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('There is something wrong occured');
    }
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: resData.cartItems,
        totalPrice: resData.totalAmount,
        date: date
      }
    });
  };
};
