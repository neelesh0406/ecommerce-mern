import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../action';
import { ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';


export default function Nav() {
    const user = useSelector(state => state.user);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        dispatch({ type: USER_LOGOUT })
        navigate('/users/signin');
    }

    return (
        <div className='nav'>
            <a href='/'>Home </a>
            <a href='/products/add'> Add product</a>
            {isLoggedIn ?
                <>
                    <a href="#" onClick={handleLogOut}> Log out {user.fullName} </a>
                    <Badge badgeContent={4} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </>
                :
                <div>
                    <a href="/users/signup"> Sign up </a>
                    <a href="/users/signin"> Sign In </a>
                </div>
            }
        </div>
    )
}
