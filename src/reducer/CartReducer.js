const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;
      console.log("product added", product);
      return state;
  }
};

export default CartReducer;
