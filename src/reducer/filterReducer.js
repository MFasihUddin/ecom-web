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
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      const { filter_products, sorting_value } = state;
      let temp_Products = [...filter_products];

      const sorting_data = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {
          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      const newSortData = temp_Products.sort(sorting_data);
      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTER_SEARCH_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "SEARCH_PRODUCTS":
      let { all_products } = state;
      let tempAllProducts = [...all_products];

      const { text, category, company, color } = state.filters;

      if (text) {
        tempAllProducts = tempAllProducts.filter((item) =>
          item.name.toLowerCase().includes(text)
        );
      }

      if (category.toLowerCase() !== "all") {
        tempAllProducts = tempAllProducts.filter(
          (item) => item.category === category
        );
      }

      if (company.toLowerCase() !== "all") {
        tempAllProducts = tempAllProducts.filter(
          (item) => item.company.toLowerCase() === company.toLowerCase()
        );
      }

      if (color !== "all") {
        tempAllProducts = tempAllProducts.filter((curr_color) =>
          curr_color.colors.includes(color)
        );
      }

      return {
        ...state,
        filter_products: tempAllProducts,
      };

    default:
      return state;
  }
};

export default filterReducer;

// 0345-9006483 iftikhar
