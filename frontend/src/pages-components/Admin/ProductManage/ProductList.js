import { deleteProduct } from "../../../redux/product/productSlice";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductUpdateModal from "./ProductUpdateModal";
import toast from "react-hot-toast";

function ProductList() {
  const dispatch = useDispatch();

  const Products = useSelector((state) => state.product.list);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.product.getError);

  const [modalDisplay, setModalDisplay] = useState(false);
  const [targetValue, setTargetValue] = useState("");

  const handleUpdate = (product) => {
    console.log(product);
    setModalDisplay(true);
    setTargetValue(product);
  };

  const handleDelete = (id) => {
    let answer = window.confirm("Bu ürünü silerseniz buna bağlı ürünler da silinir. Bu işlemi yapmak istiyor musunuz?");

    if (answer) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then((response) => {
          toast.success("Product successfully deleted.");
          // setModalDisplay(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <>
      {modalDisplay && <ProductUpdateModal modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} targetValue={targetValue} />}
      <h3>Product List</h3>
      <div style={{ maxHeight: "450px", overflowY: "scroll" }} className="row newScroll mb-4 ">
        <Table className="mb-0">
          <thead style={{ position: "sticky", top: "0px", height: "50px" }} className="bg-warning ">
            <tr style={{ textAlign: "center" }}>
              <th className="col border border-dark">Product Name</th>
              <th className="col border border-dark">Description</th>
              <th className="col border border-dark">Sub Category</th>
              <th className="col-1 border border-dark">Manage</th>
            </tr>
          </thead>
          {isLoading && Products.length < 1 && isLoading === "getAll" ? (
            <tbody>
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td>{error}</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {Products.map((product) => (
                <tr key={product.id} className="border border-warning">
                  <td className="border border-warning"> {product.name} </td>
                  <td className="border border-warning">
                    <textarea rows="2" required type="text" name="desc" disabled className="w-100" value={product.description} />
                  </td>
                  <td className="border border-warning"> {product.subcategory.name} </td>
                  <td className="d-flex border-0">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        handleUpdate(product);
                      }}
                    >
                      <BorderColorIcon />
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(product.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
    </>
  );
}

export default ProductList;
