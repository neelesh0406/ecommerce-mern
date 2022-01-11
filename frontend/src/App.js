import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Nav, Home, AddProduct } from './components/index';

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
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const id = useParams().id;

  useEffect(() => {
    const url = `/api/products/${id}`
    const getSingleProduct = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setSingleProduct(data);
    }
    getSingleProduct();
  }, [])

  const { name, description, quantity, category, imgUrl } = singleProduct;

  return <>
    <div className="single-product-top">
      <img src={imgUrl} />
    </div>
    <div className="single-product-bottom">
      <h2>{name}</h2>
      <span>{description}</span>
      <span>In stock: {quantity}</span>
      <span>Category: {category}</span>
    </div>
  </>
}

export default App;
