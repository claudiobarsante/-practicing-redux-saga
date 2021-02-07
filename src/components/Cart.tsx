import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem } from "../store/cart/types";
import { IState } from "./../store/index";
import { removeProductFromCart } from "./../store/cart/actions";

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (product) => {
      dispatch(removeProductFromCart(product));
    },
    [dispatch]
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>SubTotal</th>
        </tr>
      </thead>
      <tbody>
        {cart &&
          cart.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>{item.product.price}</td>
              <td>{item.quantity}</td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button type='button' onClick={() => handleDelete(item.product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Cart;
