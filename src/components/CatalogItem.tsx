import React, { useCallback } from "react";
import { IProduct } from "../store/cart/types";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCartRequest } from "../store/cart/actions";
import { IState } from "../store/index";

interface IProps {
  product: IProduct;
}

const CatalogItem: React.FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  //use selector 1 parametro formato global do state e o 2 é o tipo do retorno
  const isOutOfStock = useSelector<IState, boolean>((state) => {
    return state.cart.outOfStock.includes(product.id);
  });

  const handleAddproductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong>
      {" - "}
      <span>{product.price}</span>{" "}
      <button type='button' onClick={handleAddproductToCart}>
        Buy
      </button>
      {isOutOfStock && <span style={{ color: "red" }}>Out of stock</span>}
    </article>
  );
};

export default CatalogItem;
