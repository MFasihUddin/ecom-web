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
    case "SORTING_PRODUCTS":
      let newSortData;
      let temp_Products = [...action.payload];
      if (state.sorting_value === "a-z") {
        newSortData = temp_Products.sort((a, b) => {
          a.name.localeCompare(b.name);
        });
      } else if (state.sorting_value === "z-a") {
        newSortData = temp_Products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (state.sorting_value === "lowest") {
        newSortData = temp_Products.sort((a, b) => a.price - b.price);
      } else if (state.sorting_value === "highest") {
        newSortData = temp_Products.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        filter_products: newSortData,
      };

    default:
      return state;
  }
};

export default filterReducer;
