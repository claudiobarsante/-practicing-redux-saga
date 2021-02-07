import { all, takeLatest, select, call, put } from "redux-saga/effects";
import {
  ActionTypes,
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";

import api from "../../services/api";
import { AxiosResponse } from "axios";
import { IState } from "..";

/*
o '*' significa que a função é um generator, como se mais ou menos um async
'yield' é para aguardar uma execução que é assincrona
'select' é para selecionar o state global
*/

//definir o tipo da action
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

type StockResponse = {
  id: number;
  quantity: number;
};

function* checkProductStock(action: CheckProductStockRequest) {
  const { product } = action.payload;

  //se achar ele vai retornar a quantidade, mas se não achar ele vai retornar undefined
  //então usar o '|| 0' para retornar 0 ou '?? 0'
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find((item) => item.product.id === product.id)?.quantity ?? 0;
  });

  //para fazer a chamada da api  usar o 'call' e passar o parâmetro
  //separado do método
  const availableStockResponse: AxiosResponse<StockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    //o método 'put' é como se fosse o dispatch
    //todo método precisa do yield na frente
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)]);
