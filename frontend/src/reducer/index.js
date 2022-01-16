import { combineReducers } from "redux"
import { cart } from "./cartReducer";
import { user } from "./userReducer"


export const reducer = combineReducers({
    user,
    cart
});