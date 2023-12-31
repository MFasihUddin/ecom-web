import React from "react";
import PriceFormat from "./../Helper/PriceFormat";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/CartProvider";

function CartItem({ id, name, image, color, price, amount }) {
  console.log(id);
  const { removeItem } = useCartContext();
  const setDecrease = () => {
    // amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrease = () => {
    // stock > amount ? setAmount(amount + 1) : setAmount(stock);
  };
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
        setDecrease={setDecrease}
        setIncrease={setIncrease}
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
