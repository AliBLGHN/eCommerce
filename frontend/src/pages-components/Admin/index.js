import { useEffect, useState } from "react";
import CategoryManage from "./CategoryManage";
import ProductManage from "./ProductManage";
import StoreManage from "./StoreManage";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { getAllMains, getMains } from "../../redux/mainCategory/mainCategorySlice";
import { getAllProducts } from "../../redux/product/productSlice";
import { getAllSubs } from "../../redux/subCategory/subCategorySlice";
import { getTmpStores } from "../../redux/tmpStore/tmpStoreSlice";
import { getStores } from "../../redux/store/storeSlice";

function Admin() {
  const [key, setKey] = useState("category");
  const dispatch = useDispatch();

  useEffect(() => {
    if (key === "category") {
      dispatch(getAllMains());
      dispatch(getAllSubs());
    }
    if (key === "product") {
      dispatch(getMains());
      dispatch(getAllProducts());
    }
    if (key === "store") {
      dispatch(getTmpStores());
      dispatch(getStores());
    }
  }, [key, dispatch]);

  return (
    <div className="mt-5">
      <Tabs activeKey={key} id="justify-tab-example" className="mb-5 container-lg px-0" justify onSelect={(k) => setKey(k)}>
        <Tab eventKey="category" title="Category Manage">
          {key === "category" && <CategoryManage />}
        </Tab>
        <Tab eventKey="product" title="Product Manage">
          {key === "product" && <ProductManage />}
        </Tab>
        <Tab eventKey="store" title="Store Manage">
          {key === "store" && <StoreManage />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Admin;
