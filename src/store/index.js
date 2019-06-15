import { createStore } from "redux";
import { stat } from "fs";

const initialState = {
  products: [],
  count: 0,
  perPage: 6
};

const reducer = (state = initialState, action) => {
  let count = 0;
  switch (action.type) {
    case "ADDPRODUCTS":
      count = action.payload.count / state.perPage;
      return Object.assign({}, state, {
        products: action.payload.row,
        count: count
      });
    case "SEARCH_RESULTS":
      count = action.payload.count / state.perPage;
      return Object.assign({}, state, {
        products: action.payload.rows,
        count: count
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
