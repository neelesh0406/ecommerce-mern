import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Home, AddProduct, SingleProduct, SignUp, SignIn, Profile, Cart, Checkout, Orders, SingleOrder, Admin, AdminProducts, AdminOrders, EditProduct, AdminChart } from './components/index'; //Single file that contains imports of all components
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { USER_AUTHENTICATE } from "./action";
import PrivateRoute from "./PrivateRoute";


function App() {
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    console.log("USeeffect /App ", isLoggedIn);
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const { email, name, isAdmin } = jwtDecode(token);

      dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })
    }
    console.log("USeeffect /App after dispatch : ", isLoggedIn);
  }, [])

  return <BrowserRouter> {console.log("rendering.... /App ", isLoggedIn)}
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/signin' element={<SignIn />} />
        <Route path='/users/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path='/orders' element={
          <PrivateRoute >
            <Orders />
          </PrivateRoute>
        } />
        <Route path='/orders/:id' element={<SingleOrder />} />
        <Route path='/admin' element={<Admin />} >
          <Route index element={<AdminChart />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='products/add' element={<AddProduct />} />
          <Route path='products/edit/:id' element={<EditProduct />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
        <Route path='*' element={<h1>Page not found !</h1>} />
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

export default App;
