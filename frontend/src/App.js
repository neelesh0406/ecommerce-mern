import { useEffect, useState } from "react";
import Nav from './Nav';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";


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
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

const Home = ({ products }) => {
  return <div className="products-catalog">
    {products.map((item) => {
      return <div className="product" key={item._id}>
        <Link to={`/products/${item._id}`}>
          <div className="product-top">
            <img src={item.imgUrl} />
          </div>
          <div className="product-bottom">
            <h2>{item.name}</h2>
            <span>{item.description}</span>
            <span>In stock: {item.quantity}</span>
            <span>Category: {item.category}</span>
          </div>
        </Link>
      </div>
    })}
  </div>
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
