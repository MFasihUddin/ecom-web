const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };
    case "SET_DISPLAY_VIEW":
      return {
        ...state,
        display_view: !state.display_view,
      };
    case "GET_SORTING_VALUE":
      let select_value = document.getElementById("sort");
      let sort_value = select_value.options[select_value.selectedIndex].value;
      return {
        ...state,
        sorting_value: sort_value,
      };

    default:
      return state;
  }
};

export default filterReducer;
