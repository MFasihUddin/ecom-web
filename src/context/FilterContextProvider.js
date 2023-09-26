import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductHook } from "./ProductProvider";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialVal = {
  filter_products: [],
  all_products: [],
  display_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    price: 0,
    max_price: 0,
    min_price: 0,
  },
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

  // Search Input Method...
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({
      type: "UPDATE_FILTER_SEARCH_VALUE",
      payload: { name, value },
    });
  };

  //clearFilters
  const clearFilters = () => dispatch({ type: "CLEAR_FILTERS" });

  //sorting api call
  useEffect(() => {
    dispatch({ type: "SEARCH_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setDisplayView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContextProvider, useFilterContext };
