import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Home, AddProduct, SingleProduct, SignUp, SignIn, Profile, Cart, Checkout, Orders, SingleOrder, Admin, AdminProducts, AdminOrders, EditProduct } from './components/index'; //Single file that contains imports of all components
import { getProductsUrl } from "./helpers/url";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { USER_AUTHENTICATE } from "./action";


function App() {
  // const [products, setProducts] = useState([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   //get request to "http:localhost:8000/api/products"


  //   if (localStorage.getItem('token')) {
  //     const token = localStorage.getItem('token');
  //     const { email, name, isAdmin } = jwtDecode(token);
  //     console.log("***** ", jwtDecode(token));

  //     dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name, isAdmin } })
  //   }

  // }, [])

  return <BrowserRouter>
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/signin' element={<SignIn />} />
        <Route path='/users/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:id' element={<SingleOrder />} />
        <Route path='/admin' element={<Admin />} >
          <Route index element={<h1>main</h1>} />
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
