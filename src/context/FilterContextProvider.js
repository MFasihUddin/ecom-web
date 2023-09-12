import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductHook } from "./ProductProvider";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialVal = {
  filter_products: [],
  all_products: [],
};

function FilterContextProvider({ children }) {
  const { products } = useProductHook();
  const [state, dispatch] = useReducer(reducer, initialVal);
  console.log(products);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContextProvider, useFilterContext };
