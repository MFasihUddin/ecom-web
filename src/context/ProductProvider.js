import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";

const ProductContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialVal = {
  isfeature: false,
  isError: false,
  products: [],
  featureProduct: [],
};

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialVal);

  useEffect(() => {
    getData(API);
  }, []);

  const getData = async (url) => {
    dispatch({ type: "API_LOADING" });
    try {
      const res = await axios.get(url);
      const product = await res.data;
      dispatch({ type: "API_DATA", payload: product });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const info = { name: "fasih" };
  return (
    <ProductContext.Provider value={{ ...state }}>
      {children}
    </ProductContext.Provider>
  );
}

//useCustomhook

const useProductHook = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductHook };
