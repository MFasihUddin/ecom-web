const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;
      const cart_Product = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, cart_Product],
      };

    case "REMOVE_ITEM":
      const item_Id = action.payload;
      let updated_array = state.cart.filter((item) => item.id !== item_Id);
      console.log(updated_array);
      return {
        ...state,
        cart: updated_array,
      };
    default:
      return state;
  }
};

export default CartReducer;
