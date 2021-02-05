import { Reducer } from "redux";
import produce from "immer";
import { ICartState } from "./types";
import { ActionTypes } from "./actions";

const INITIAL_STATE: ICartState = {
  items: [],
  outOfStock: [],
};

//usando o immer não preciso mais usar o spread operator
//return { ...state, items: [...state.items, { product, quantity: 1 }] };
//como tb vou usar em vários actions posso puxar p fora do case
/*
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      const { product } = action.payload;

      return produce(state, (draft) => {
        draft.items.push({
          product,
          quantity: 1,
        });
      });

    default:
      return state;
  }
};*/

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess:
        const { product } = action.payload;
        const productInCartIndex = draft.items.findIndex((item) => item.product.id === product.id);

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }
        break;
      case ActionTypes.addProductToCartFailure:
        draft.outOfStock.push(action.payload.productId);
        break;
      default:
        return draft;
    }
  });
};

export default cart;
