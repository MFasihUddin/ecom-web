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
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
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
    // dispatch({ type: "Total_ITEM" });
    // dispatch({ type: "Cart_Total_Price" });
    dispatch({ type: "CART_ITEM_AND_PRICE_TOTAL" });
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
