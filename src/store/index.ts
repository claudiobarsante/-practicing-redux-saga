import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { ICartState } from "./cart/types";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

//cart é o reducer(tem q colocar o mesmo nome q colocou lá no combineReducers) e ICartState é o tipo do state
//vai precisar disso p usar o useSelector e select
export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
