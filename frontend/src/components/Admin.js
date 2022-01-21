import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { USER_AUTHENTICATE } from '../action';

export default function Admin() {



    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         console.log("*** USe effect run");
    //         const token = localStorage.getItem('token');
    //         const { email, name, isAdmin } = jwtDecode(token);

    //         dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })
    //     }

    // }, [])

    // const dispatch = useDispatch();
    // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    // const isAdmin = useSelector(state => state.user.user.isAdmin);
    // const user = useSelector(state => state.user);

    // console.log("*** ADMIN PAGE ", isLoggedIn, isAdmin, user);

    // if (!isLoggedIn) {
    //     console.log("** !isl on admin.js", isLoggedIn, isAdmin, user);
    //     return <Navigate to='/users/signin' />
    // }
    // if (!isAdmin) {
    //     return <Navigate to='/orders' />
    // }

    return <div className='admin'>
        <div className="admin-sidebar">
            <h1>Admin Controls</h1>
            <div>All orders</div>
            <div>All products</div>
            <div>Add product</div>
        </div>
        {/* sidebar */}
        {/* View all products -> edit/delete , checkbox */}
        {/* Add products */}
        {/* View all orders */}
        {/* main */}
        <div className="admin-main">
            main
        </div>
    </div>;
}
