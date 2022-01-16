import { ADD_TO_CART, DECREASE_CART_QUANTITY, INCREASE_CART_QUANTITY, REMOVE_FROM_CART } from "../action"

const initialCartState = {
    items: [],
    cartTotal: 0,
    cartQuantity: 0
}

export const cart = (state = initialCartState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.value; // item object of item to be added

            // if item new : ...item , quantity: 1
            // If already present in cart, update quantity : update the quantity + 1
            const isPresent = state.items.find(element => element._id === item._id); //check if item exist in array

            if (isPresent) {
                const newArr = state.items.filter(element => {
                    if (element._id === item._id) {
                        element.quantity += 1;
                    }
                    return element;
                })
                return {
                    items: newArr,
                    cartQuantity: state.cartQuantity + 1,
                    cartTotal: state.cartTotal + item.price
                }
            }
            // If new item added for first time
            return {
                items: [...state.items, { ...item, quantity: 1 }],
                cartQuantity: state.cartQuantity + 1,
                cartTotal: state.cartTotal + item.price
            }

        case REMOVE_FROM_CART:
            {    // dispatch item id from onClick, search for that id and remove
                const id = action.value;   //item id to be deleted

                let newTotal = state.cartTotal;
                const newArr = state.items.filter(item => {
                    if (item._id === id) {
                        newTotal = newTotal - item.price;  //reduce the cart total
                        return;
                    }
                    return item;
                })

                return {
                    items: newArr,
                    cartQuantity: state.cartQuantity - 1,
                    cartTotal: newTotal
                }
            }

        case INCREASE_CART_QUANTITY:
            {
                let newTotal = state.cartTotal;
                const newArr = state.items.filter(element => {
                    if (element._id === action.value) {
                        element.quantity += 1;
                        newTotal = newTotal + element.price;
                    }
                    return element;
                })
                return {
                    items: newArr,
                    cartQuantity: state.cartQuantity + 1,
                    cartTotal: newTotal
                }
            }

        case DECREASE_CART_QUANTITY:
            {
                let newTotal = state.cartTotal;
                const newArr = state.items.filter(element => {
                    if (element._id === action.value) {
                        element.quantity -= 1;
                        newTotal = newTotal - element.price;
                    }
                    return element;
                })
                return {
                    items: newArr,
                    cartQuantity: state.cartQuantity - 1,
                    cartTotal: newTotal
                }
            }
        default: return state
    }
}

