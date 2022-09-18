import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/product/productSlice";

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

function ProdyctAdd() {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [mainId, setMainId] = useState("");
  const [subId, setSubId] = useState("");
  const [photos, setPhotos] = useState([]);

  const Mains = useSelector((state) => state.maincategory.listWithSubs);

  const formSubmit = (e) => {
    console.log(photos);
    e.preventDefault();
    if (productName && productDesc && subId) {
      if (photos && photos.length === 3) {
        let formdata = new FormData();
        formdata.append("name", productName);
        formdata.append("description", productDesc);
        formdata.append("sub_category_id", subId);
        photos.forEach((photo) => {
          formdata.append("photos[]", photo);
        });

        dispatch(addProduct(formdata))
          .unwrap()
          .then((response) => {
            setProductName("");
            setProductDesc("");
            setMainId("");
            setSubId("");
            setPhotos("");
            toast.success("Product successfully added.");
          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        toast.error("You must choose 3 product photo");
      }
    } else {
      toast.error("You must fill in all fields");
    }
  };

  function changeMainPhoto(e) {
    let addSiblingsToNewPhotos = function (e, newPhotos) {
      let sibling = e.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
          newPhotos.push(sibling.value);
          //sibling.classList = "col-4";
        }
        sibling = sibling.nextSibling;
      }
    };

    let newPhotos = [];
    newPhotos.push(e.target.value);
    addSiblingsToNewPhotos(e.target, newPhotos);
    setPhotos(newPhotos);
  }

  useEffect(() => {
    if (photos.length !== 0) {
      if (photos.length === 3) {
        for (let i = 0; i < photos.length; i++) {
          document.getElementById(`pa-img-${i}`).src = URL.createObjectURL(photos[i]);
          document.getElementById(`pa-img-${i}`).value = photos[i];
        }
      } else {
        toast.error("You must choose 3 product photo");
        setPhotos("");
      }
    }
  }, [photos]);

  function selectPhotos(item) {
    let array = [];
    for (let i = 0; i < item.length; i++) {
      array = [...array, item[i]];
    }
    setPhotos(array);
  }
  return (
    <>
      <form className="d-flex flex-column align-items-center" onSubmit={formSubmit}>
        <h3>Add Product Form</h3>
        <select required className="row w-75 mb-3 mt-4" name="main" onChange={(e) => setMainId(e.target.value)} style={{ height: "35px" }}>
          <option hidden value="">
            Select Main Category
          </option>
          {Mains.map((main) => (
            <option key={main.id} value={main.id}>
              {main.name}
            </option>
          ))}
        </select>

        <select
          required
          className="row w-75 mb-3"
          disabled={mainId === ""}
          name="sub"
          onChange={(e) => setSubId(e.target.value)}
          style={{ height: "35px" }}
        >
          <option hidden value="">
            Select Sub Category
          </option>
          {mainId &&
            Mains.find((main) => main.id === parseInt(mainId)).subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
        </select>

        <input
          required
          style={{ height: "35px" }}
          value={productName}
          type="text"
          id="pinp"
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
          className="row w-75 mb-3"
        />
        <textarea
          rows="3"
          required
          value={productDesc}
          type="text"
          name="desc"
          placeholder="Description"
          onChange={(e) => setProductDesc(e.target.value)}
          className="row w-75 mb-3"
        />

        <label htmlFor="imgInp" className="selectLabel mb-4" style={{ textDecoration: "underline" }}>
          <i>Click to choose 3 product photo</i>
        </label>
        <input className="w-75 " accept="image/*" hidden type="file" id="imgInp" multiple onChange={(e) => selectPhotos(e.target.files)} />

        {photos && photos.length === 3 && (
          <div className="changeMainPhoto d-flex-flex-column mb-5">
            <div className="row mx-0 px-0">
              <div className="col-4">Main</div>
              <div className="col-4">Second</div>
              <div className="col-4">Third</div>
            </div>
            <div className="row mx-0 px-0 border">
              <img
                id="pa-img-0"
                alt="product resim"
                style={{ objectFit: "contain", maxHeight: "175px" }}
                className="col-4 border border-dark border-2"
                onClick={(e) => changeMainPhoto(e)}
              />
              <img
                id="pa-img-1"
                alt="product resim"
                style={{ objectFit: "contain", maxHeight: "175px" }}
                className="col-4"
                onClick={(e) => changeMainPhoto(e)}
              />
              <img
                id="pa-img-2"
                alt="product resim"
                style={{ objectFit: "contain", maxHeight: "175px" }}
                className="col-4"
                onClick={(e) => changeMainPhoto(e)}
              />
            </div>
            <i style={{ opacity: "0.7" }}>You can set the photo you clicked as the main photo</i>
          </div>
        )}

        <Button type="submit" variant="success" className="w-50">
          <AddIcon /> Add Product
        </Button>
      </form>
    </>
  );
}

export default ProdyctAdd;
