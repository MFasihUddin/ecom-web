import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/CartReducer";
const CartContext = createContext();

const initialVal = {
  cart: [],
  total_amount: "",
  total_item: "",
  shipping_fee: 5000,
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialVal);
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };