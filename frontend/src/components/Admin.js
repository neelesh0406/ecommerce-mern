import jwtDecode from 'jwt-decode';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { USER_AUTHENTICATE } from '../action';

export default function Admin() {

    const isAdmin = useSelector(state => state.user.user.isAdmin);

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

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    return <div className='admin'>
        <div className="admin-sidebar">
            <h1 style={{ marginBottom: "30px", fontWeight: "500", color: "#ff7b41" }}>Admin <br /> Controls</h1>
            <ul>
                <li>
                    <Link to='/admin/products'>ALL PRODUCTS</Link>
                </li>
                <li>
                    <Link to='/admin/orders'>ALL ORDERS</Link>
                </li>
            </ul>
        </div>
        {/* sidebar */}
        {/* View all products -> edit/delete , checkbox */}
        {/* Add products */}
        {/* View all orders */}
        {/* main */}
        <div className="admin-main">
            <Outlet />
        </div>
    </div>;
}
