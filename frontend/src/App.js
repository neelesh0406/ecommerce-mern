import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Home, AddProduct, SingleProduct, SignUp, SignIn, Profile, Cart } from './components/index'; //Single file that contains imports of all components
import { getProductsUrl } from "./helpers/url";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { USER_AUTHENTICATE } from "./action";


function App() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    //get request to "http:localhost:8000/api/products"
    fetch(getProductsUrl)
      .then(response => response.json())
      .then(data => setProducts(data));

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const { email, name } = jwtDecode(token);

      dispatch({ type: USER_AUTHENTICATE, value: { email, fullName: name } })
    }

  }, [])

  return <BrowserRouter>
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home products={products} />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/products/add' element={<AddProduct />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/signin' element={<SignIn />} />
        <Route path='/users/profile' element={<Profile />} />
        <Route path='/users/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

export default App;
