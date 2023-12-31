import React from "react";
import PriceFormat from "./../Helper/PriceFormat";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/CartProvider";

function CartItem({ id, name, image, color, price, amount }) {
  const { removeItem, setIncrease, setDecrease } = useCartContext();

  return (
    <div className="cart-heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={name} />
          </figure>
        </div>
        <p>{name}</p>
        <div className="color-div">
          <p>Color:</p>
          <div
            className="color-style"
            style={{ backgroundColor: color, color: color }}
          ></div>
        </div>
      </div>
      {/* price */}
      <div className="card-hide">
        <p>
          <PriceFormat price={price} />
        </p>
      </div>
      {/* quantity */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* Subtotal */}

      <div className="cart-hide">
        <p>
          <PriceFormat price={price * amount} />
        </p>
      </div>

      {/* remove */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
}

export default CartItem;
