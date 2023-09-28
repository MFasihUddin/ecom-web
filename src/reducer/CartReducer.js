const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;

      let exsistingProduct = state.cart.find((item) => item.id === id + color);
      console.log(exsistingProduct);

      if (exsistingProduct) {
        let updatedProduct = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            return {
              ...item,
              amount: newAmount,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
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
      }

    case "REMOVE_ITEM":
      const item_Id = action.payload;
      let updated_array = state.cart.filter((item) => item.id !== item_Id);
      return {
        ...state,
        cart: updated_array,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default CartReducer;
