import React from "react";
import StoreInfo from "./StoreInfo";
import WorkerManage from "./WorkerManage";
import ProductManage from "./ProductManage";

export default function index() {
  return (
    <div>
      <StoreInfo />
      <br />
      <br />
      <br />
      <ProductManage />
      <br />
      <br />
      <WorkerManage />
    </div>
  );
}
