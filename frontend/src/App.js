import { useEffect, useState } from "react";
import Nav from './Nav';
import './App.css';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "/api/products";
    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return <div className="App">
    <Nav />
    <Home products={products} />
  </div>;
}

const Home = ({ products }) => {
  return <div className="products-catalog">
    {products.map((item) => {
      return <div className="product" key={item._id}>
        <div className="product-top">
          <img src={item.imgUrl} />
        </div>
        <div className="product-bottom">
          <h2>{item.name}</h2>
          <span>{item.description}</span>
          <span>In stock: {item.quantity}</span>
          <span>Category: {item.category}</span>
        </div>
      </div>
    })}
  </div>
}

export default App;
