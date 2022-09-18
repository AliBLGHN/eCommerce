import React from "react";
import Filters from "./Filters";
import ProductList from "./ProductList";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  return (
    <div>
      <Filters />
      <br />
      <br />
      <ProductList />
    </div>
  );
}

export default Home;
