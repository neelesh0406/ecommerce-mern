import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../action';
import { ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';


export default function Nav() {
    const user = useSelector(state => state.user.user);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const isAdmin = useSelector(state => state.user.user.isAdmin);
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
            {isLoggedIn ?
                <>
                    <Link to="#" onClick={handleLogOut}> Log out {user.fullName} </Link>
                </>
                :
                <div>
                    <Link to="/users/signup"> Sign up </Link>
                    <Link to="/users/signin"> Sign In </Link>
                </div>
            }
            {isLoggedIn && !isAdmin && <Link to='/orders'>Orders</Link>}

            {isAdmin && <Link to='/admin'>Admin</Link>}
            <Link to='/cart'>
                <Badge badgeContent={cartQuantity} color="secondary">
                    <ShoppingCart />
                </Badge>
            </Link>
        </div>
    )
}
