import React from "react";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";

function ProductManage() {
  return (
    <div className="row container mx-auto px-0">
      <div className="col-12 col-sm-10 col-md-8 col-lg-4 mx-auto mb-5 px-4">
        <ProductAdd />
      </div>
      <div className="col-12 col-lg-8 mx-auto mb-5 px-4">
        <ProductList />
      </div>
    </div>
  );
}

export default ProductManage;
