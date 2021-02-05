import React from "react";
import { useSelector } from "react-redux";
import { ICartItem } from "../store/cart/types";
import { IState } from "./../store/index";

const Cart: React.FC = () => {
  const test = useSelector<IState>((state) => state);
  console.log("test , ", test);
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);

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
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Cart;
