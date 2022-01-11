import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "/api/products";
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
  }, [])

  return <div className="App">HIII</div>;
}

export default App;
