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
    //
    const { type, payload } = action;

    switch (type) {
      //
      case ActionTypes.addProductToCartSuccess:
        const productToAddInCartIndex = draft.items.findIndex(
          (item) => item.product.id === payload.product.id
        );

        if (productToAddInCartIndex >= 0) {
          draft.items[productToAddInCartIndex].quantity++;
        } else {
          draft.items.push({
            product: payload.product,
            quantity: 1,
          });
        }
        break;

      case ActionTypes.addProductToCartFailure:
        const isOutOfStockIdx = draft.outOfStock.findIndex(
          (product) => product === payload.productId
        );
        if (isOutOfStockIdx === -1) draft.outOfStock.push(payload.productId);
        break;

      case ActionTypes.removeProductFromCart:
        const productIdToRemove = payload.product.id;
        const productToRemoveInCartIndex = draft.items.findIndex(
          (item) => item.product.id === productIdToRemove
        );

        if (draft.items[productToRemoveInCartIndex].quantity > 1) {
          draft.items[productToRemoveInCartIndex].quantity--;
        } else {
          draft.items.splice(productToRemoveInCartIndex, 1);
        }
        //se o produto estiver listado como fora de estoque, eu tiro ele
        //pode usar o filter ou splice
        //depois verificar não consegui fazer o filter funcionar
        //draft.outOfStock.filter((productId: number) => productId !== 1);
        //if (index !== -1) draft.outOfStock.filter((item: number) => item !== productIdToRemove);
        const index = draft.outOfStock.findIndex(
          (productId: number) => productId === productIdToRemove
        );

        if (index !== -1) draft.outOfStock.splice(index, 1);
        break;

      default:
        return draft;
    }
  });
};

export default cart;
