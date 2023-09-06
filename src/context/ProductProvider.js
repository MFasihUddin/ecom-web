import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";

const ProductContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialVal = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialVal);

  useEffect(() => {
    getData(API);
  }, []);

  //get All Product
  const getData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const product = await res.data;
      dispatch({ type: "SET_API_DATA", payload: product });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  //get SingleProduct
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  return (
    <ProductContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

//useCustomhook

const useProductHook = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductHook };
