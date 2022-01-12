import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Home, AddProduct, SingleProduct, SignUp } from './components/index'; //Single file that contains imports of all components

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "/api/products";
    fetch(url)
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
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

export default App;
