import React, { useCallback } from "react";
import { IProduct } from "./../store/modules/cart/types";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/modules/cart/actions";

interface IProps {
  product: IProduct;
}

const CatalogItem: React.FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddproductToCart = useCallback(() => {
    dispatch(addProductToCart(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong>
      {" - "}
      <span>{product.price}</span>{" "}
      <button type='button' onClick={handleAddproductToCart}>
        Comprar
      </button>
    </article>
  );
};

export default CatalogItem;
