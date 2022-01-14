import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Home, AddProduct, SingleProduct, SignUp, SignIn, Profile } from './components/index'; //Single file that contains imports of all components
import { getProductsUrl } from "./helpers/url";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //get request to "http:localhost:8000//api/products"
    fetch(getProductsUrl)
      .then(response => response.json())
      .then(data => setProducts(data));
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
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

export default App;
