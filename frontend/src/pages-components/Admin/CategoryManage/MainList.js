import { deleteMainCategory } from "../../../redux/mainCategory/mainCategorySlice";
import { getAllSubs } from "../../../redux/subCategory/subCategorySlice";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateModal from "./UpdateModal";
import AddMain from "./AddMain";
import toast from "react-hot-toast";

function MainList() {
  const dispatch = useDispatch();
  const Mains = useSelector((state) => state.maincategory.list);
  const isLoading = useSelector((state) => state.maincategory.isLoading);
  const error = useSelector((state) => state.maincategory.getError);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [targetValue, setTargetValue] = useState("");
  const handleDelete = (id) => {
    let answer = window.confirm(
      "Kategoriyi silmek üzeresiniz, eğer kategoriyi silerseniz buna bağlı sub kategorileri ve ürünler da silinir. Bu işlemi yapmak istiyor musunuz?"
    );

    if (answer) {
      dispatch(deleteMainCategory(id))
        .unwrap()
        .then((response) => {
          toast.success("Main category successfully deleted.");
          setModalDisplay(false);
          dispatch(getAllSubs());
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = (main) => {
    setModalDisplay(true);
    setTargetValue(main);
  };

  return (
    <>
      {modalDisplay && (
        <UpdateModal modalDisplay={setModalDisplay} setModalDisplay={setModalDisplay} targetValue={targetValue} forWhichOne={"main"} />
      )}
      <h3>Main Category List :</h3>
      <div style={{ maxHeight: "450px", overflowY: "scroll" }} className="row newScroll mb-4 ">
        <Table className="mb-0">
          <thead style={{ position: "sticky", top: "0px", height: "50px" }} className=" bg-warning ">
            <tr style={{ textAlign: "center" }}>
              <th className="col border border-dark">Main Category Name</th>
              <th className="col-1 border border-dark">Manage</th>
            </tr>
          </thead>
          {isLoading && Mains.length < 1 && isLoading === "getAll" ? (
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
              {Mains.map((main) => (
                <tr key={main.id} className="border border-warning">
                  <td className="border border-warning"> {main.name} </td>
                  <td className="d-flex border-0">
                    <button className="btn btn-info" onClick={() => handleUpdate(main)}>
                      {/* EDİT BUTTON  */}
                      <BorderColorIcon />
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" variant="danger" value={main.id} onClick={(e) => handleDelete(main.id)}>
                      {/* DELETE BUTTON  */}
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>

      <AddMain />
    </>
  );
}

export default MainList;
