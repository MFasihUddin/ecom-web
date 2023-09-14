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
    default:
      return state;
  }
};

export default filterReducer;

// case "SET_GRID_VIEW":
//       return {
//         ...state,
//         grid_view: true,
//       };
