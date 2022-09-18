import { addMainCategory } from "../../../redux/mainCategory/mainCategorySlice";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

function AddMain() {
  const dispatch = useDispatch();
  const [mainCat, setMainCat] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (mainCat) {
      dispatch(addMainCategory({ name: mainCat }))
        .unwrap()
        .then((response) => {
          toast.success("Main category successfully added.");
        })
        .catch((error) => {
          toast.error(error);
        });
      setMainCat("");
    } else {
      toast.error("You must fill in all fields");
    }
  };

  return (
    <form onSubmit={formSubmit} className="row justify-content-around">
      <input required value={mainCat} type="text" placeholder="Main category name" onChange={(e) => setMainCat(e.target.value)} className="col-6" />
      <Button type="submit" className="col-4 d-flex align-items-center" variant="success">
        <AddIcon />
        &nbsp;Add Main
      </Button>
    </form>
  );
}

export default AddMain;
