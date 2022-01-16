import { ADD_TO_CART, REMOVE_FROM_CART } from "../action"

const initialCartState = {
    items: [],
    cartTotal: 0,
    cartQuantity: 0
}

export const cart = (state = initialCartState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log("Cart reducer called***");
            return {
                items: [...state.items, action.value],
                cartQuantity: state.cartQuantity + 1,
                cartTotal: state.cartTotal + action.value.price
            }
        default: return state
    }
}

