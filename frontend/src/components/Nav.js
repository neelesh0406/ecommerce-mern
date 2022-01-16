import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../action';
import { ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';


export default function Nav() {
    const user = useSelector(state => state.user.user);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const cartQuantity = useSelector(state => state.cart.cartQuantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        dispatch({ type: USER_LOGOUT })
        navigate('/users/signin');
    }

    return (
        <div className='nav'>
            <Link to='/'>Home </Link>
            <Link to='/products/add'> Add product</Link>
            {isLoggedIn ?
                <>
                    <Link to="#" onClick={handleLogOut}> Log out {user.fullName} </Link>
                    <Link to='/cart'>
                        <Badge badgeContent={cartQuantity} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </Link>
                </>
                :
                <div>
                    <Link to="/users/signup"> Sign up </Link>
                    <Link to="/users/signin"> Sign In </Link>
                </div>
            }
        </div>
    )
}
