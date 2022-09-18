import { deleteSubCategory } from "../../../redux/subCategory/subCategorySlice";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateModal from "./UpdateModal";
import AddSub from "./AddSub";
import toast from "react-hot-toast";

function SubList() {
  const dispatch = useDispatch();
  const Subs = useSelector((state) => state.subcategory.list);
  const isLoading = useSelector((state) => state.subcategory.isLoading);
  const error = useSelector((state) => state.subcategory.getError);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [targetValue, setTargetValue] = useState("");

  const handleUpdate = (sub) => {
    setModalDisplay(true);
    setTargetValue(sub);
  };

  const handleDelete = (id) => {
    let answer = window.confirm(
      "Kategoriyi silmek üzeresiniz, eğer kategoriyi silerseniz buna bağlı ürünler da silinir. Bu işlemi yapmak istiyor musunuz?"
    );

    if (answer) {
      dispatch(deleteSubCategory(id))
        .unwrap()
        .then((response) => {
          toast.success("Sub category successfully deleted.");
          setModalDisplay(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <>
      {modalDisplay && <UpdateModal modalDisplay={setModalDisplay} setModalDisplay={setModalDisplay} targetValue={targetValue} forWhichOne={"sub"} />}
      <h3>Sub Category List :</h3>
      <div style={{ maxHeight: "450px", overflowY: "scroll" }} className="row newScroll mb-4 ">
        <Table className="mb-0">
          <thead style={{ position: "sticky", top: "0px", height: "50px" }} className="bg-warning">
            <tr style={{ textAlign: "center" }}>
              <th className="col border border-dark">Sub Category Name</th>
              <th className="col border border-dark">Main Category Name</th>
              <th className="col-1 border border-dark">Manage</th>
            </tr>
          </thead>
          {isLoading && Subs.length < 1 && isLoading === "get" ? (
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
              {Subs.map((sub) => (
                <tr key={sub.id} className="border border-warning">
                  <td className="border border-warning"> {sub.name} </td>
                  <td className="border border-warning"> {sub.maincategory.name} </td>
                  <td className="d-flex border-0">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        handleUpdate(sub);
                      }}
                    >
                      <BorderColorIcon />
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(sub.id);
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

      <AddSub />
    </>
  );
}

export default SubList;
