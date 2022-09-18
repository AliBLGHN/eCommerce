import { updateSubCategory, getAllSubs } from "../../../redux/subCategory/subCategorySlice";
import { updateMainCategory } from "../../../redux/mainCategory/mainCategorySlice";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

function UpdateModal({ modalDisplay, setModalDisplay, targetValue, forWhichOne }) {
  const Mains = useSelector((state) => state.maincategory.list);
  const dispatch = useDispatch();

  const [mainId, setMainId] = useState(targetValue.main_category_id);
  const [nameInput, setNameInput] = useState(targetValue.name);

  const formSubmit = async (event) => {
    event.preventDefault();
    if (forWhichOne === "main") {
      let main = {
        id: targetValue.id,
        data: {
          name: nameInput,
        },
      };
      dispatchRun(updateMainCategory(main), "Main");
    } else if (forWhichOne === "sub") {
      let sub = {
        id: targetValue.id,
        data: {
          main_category_id: mainId,
          name: nameInput,
        },
      };
      dispatchRun(updateSubCategory(sub), "Sub");
    }
  };

  function dispatchRun(runFunction, target) {
    dispatch(runFunction)
      .unwrap()
      .then((response) => {
        toast.success(target + " category successfully updated.");
        setModalDisplay(false);
        target === "Main" && dispatch(getAllSubs());
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  return (
    <Modal className="" style={{ paddingTop: "15%" }} show={modalDisplay} onHide={() => setModalDisplay(false)}>
      <Modal.Header closeButton>{`Update ${forWhichOne} category`}</Modal.Header>
      <Modal.Body className="">
        <Form className="d-flex flex-column align-items-center" onSubmit={formSubmit}>
          <div className="row w-100 px-2">
            {forWhichOne === "sub" && (
              <div className="col">
                <label className="row" htmlFor="main">
                  Select Main Category
                </label>
                <select
                  required
                  className="row w-100"
                  style={{ height: "30px" }}
                  id="main"
                  name="main"
                  defaultValue={mainId}
                  onChange={(e) => setMainId(e.target.value)}
                >
                  {Mains.map((main) => (
                    <option key={main.id} value={main.id}>
                      {main.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col">
              <label className="row" htmlFor="name">
                {`${forWhichOne.charAt(0).toUpperCase() + forWhichOne.slice(1)} category name`}
              </label>
              <input
                required
                autoFocus
                onFocus={(e) => e.target.select()}
                id="name"
                className="row w-100"
                value={nameInput}
                type="text"
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-info mt-3 w-50">
            <BorderColorIcon />
            &nbsp; Update
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateModal;
