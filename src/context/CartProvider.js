import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/CartReducer";
const CartContext = createContext();

const getLocaldata = () => {
  let localCartData = localStorage.getItem("cart_item");
  if (localCartData === []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialVal = {
  cart: getLocaldata(),
  // cart: [],
  total_amount: "",
  total_item: "",
  shipping_fee: 5000,
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialVal);

  //item add to card
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  //item remove from card
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //item saved to local storage
  useEffect(() => {
    localStorage.setItem("cart_item", JSON.stringify(state.cart));
  }, [state.cart]);

  //clear Cart Item
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  //Cart Item Increment and Decrement
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };
  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
