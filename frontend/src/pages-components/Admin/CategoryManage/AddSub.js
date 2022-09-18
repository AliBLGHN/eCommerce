import { addSubCategory } from "../../../redux/subCategory/subCategorySlice";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

function AddMain() {
  const dispatch = useDispatch();
  const [subCat, setSubCat] = useState("");
  const [mainId, setMainId] = useState("");
  const Mains = useSelector((state) => state.maincategory.list);

  const formSubmit = (e) => {
    e.preventDefault();
    if (mainId && subCat) {
      dispatch(addSubCategory({ main_category_id: mainId, name: subCat }))
        .unwrap()
        .then((response) => {
          toast.success("Sub category successfully added.");
        })
        .catch((error) => {
          toast.error(error);
        });
      setSubCat("");
    } else {
      toast.error("You must fill in all fields");
    }
  };

  return (
    <form className="row justify-content-around d-flex" onSubmit={formSubmit}>
      <select required className="col-3 " name="main" onChange={(e) => setMainId(e.target.value)}>
        <option hidden value="">
          Select main cat.
        </option>
        {Mains.map((main) => (
          <option key={main.id} value={main.id}>
            {main.name}
          </option>
        ))}
      </select>

      <input required value={subCat} type="text" placeholder="Sub category name" onChange={(e) => setSubCat(e.target.value)} className="col-4" />
      <Button type="submit" variant="success" className="col-3 d-flex align-items-center">
        <AddIcon />
        &nbsp;Add Sub
      </Button>
    </form>
  );
}

export default AddMain;
