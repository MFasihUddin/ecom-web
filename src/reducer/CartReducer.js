const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;

      let exsistingProduct = state.cart.find((item) => item.id === id + color);

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

    case "SET_DECREMENT":
      let updatedProduct = state.cart.map((item) => {
        if (item.id === action.payload) {
          let decAmount = item.amount > 1 ? item.amount - 1 : 1;
          return {
            ...item,
            amount: decAmount,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };

    case "SET_INCREMENT":
      let updatedItem = state.cart.map((item) => {
        if (item.id === action.payload) {
          let incAmount = item.amount < item.max ? item.amount + 1 : item.max;
          return {
            ...item,
            amount: incAmount,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        cart: updatedItem,
      };

    // case "Total_ITEM":
    //   let updateTotalAmount = state.cart.reduce((initialVal, curItem) => {
    //     const { amount } = curItem;

    //     initialVal = initialVal + amount;
    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_item: updateTotalAmount,
    //   };

    // case "Cart_Total_Price":
    //   let total_price = state.cart.reduce((initialVal, curItem) => {
    //     let { price, amount } = curItem;

    //     initialVal = initialVal + price * amount;
    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_price: total_price,
    //   };

    case "CART_ITEM_AND_PRICE_TOTAL":
      let { total_item, total_price } = state.cart.reduce(
        (accum, curItem) => {
          const { amount, price } = curItem;

          accum.total_item += amount;
          accum.total_price += price * amount;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {
        ...state,
        total_item,
        total_price,
      };

    default:
      return state;
  }
};

export default CartReducer;
