import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductHook } from "./ProductProvider";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialVal = {
  filter_products: [],
  all_products: [],
  display_view: true,
  sorting_value: "lowest",
};

function FilterContextProvider({ children }) {
  const { products } = useProductHook();
  const [state, dispatch] = useReducer(reducer, initialVal);

  // set Grid VS List View...
  const setDisplayView = () => {
    return dispatch({ type: "SET_DISPLAY_VIEW" });
  };

  //sorting Function
  const sorting = (event) => {
    const sort_value = event.target.value;
    return dispatch({ type: "GET_SORTING_VALUE", payload: sort_value });
  };

  //sorting api call
  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [state.sorting_value]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, setDisplayView, sorting }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContextProvider, useFilterContext };
