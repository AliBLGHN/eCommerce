import Modal from "react-bootstrap/Modal";
import { updateProduct } from "../../../redux/product/productSlice";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import toast from "react-hot-toast";

function UpdateModal({ modalDisplay, setModalDisplay, targetValue }) {
  const Mains = useSelector((state) => state.maincategory.listWithSubs);
  const dispatch = useDispatch();

  const [mainId, setMainId] = useState(targetValue.subcategory.main_category_id);
  const [subId, setSubId] = useState(targetValue.sub_category_id);
  const [productName, setProductName] = useState(targetValue.name);
  const [productDesc, setProductDesc] = useState(targetValue.description);
  const [photos, setPhotos] = useState(targetValue.photos);
  const [newPhotos, setNewPhotos] = useState([]);

  const formSubmit = async (event) => {
    event.preventDefault();
    if (productName && productDesc && subId && (photos.length === 3 || newPhotos.length === 3)) {
      let formdata = new FormData();
      formdata.append("id", targetValue.id);
      formdata.append("name", productName);
      formdata.append("description", productDesc);
      formdata.append("sub_category_id", subId);
      newPhotos.length === 3
        ? newPhotos.forEach((newphoto) => {
            console.log(newphoto);

            formdata.append("photos[]", newphoto);
          })
        : photos.forEach((photo) => {
            console.log(photo);

            formdata.append("photos[]", photo);
          });

      console.log(...formdata);
      dispatch(updateProduct(formdata))
        .unwrap()
        .then((response) => {
          toast.success("Product successfully updated.");
          setModalDisplay(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("You must fill in all fields");
    }
  };

  useEffect(() => {
    if (newPhotos.length === 3) {
      for (let i = 0; i < newPhotos.length; i++) {
        document.getElementById(`pu-img-${i}`).src = URL.createObjectURL(newPhotos[i]);
        document.getElementById(`pu-img-${i}`).value = newPhotos[i];
      }
    } else {
      for (let i = 0; i < photos.length; i++) {
        document.getElementById(`pu-img-${i}`).src = photos[i].path;
        document.getElementById(`pu-img-${i}`).value = photos[i];
      }
    }
  }, [photos, newPhotos]);

  function changeMainPhoto(e) {
    let addSiblingsToNewPhotos = function (e, newSelectedPhotos) {
      let sibling = e.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
          newSelectedPhotos.push(sibling.value);
        }
        sibling = sibling.nextSibling;
      }
    };

    let newSelectedPhotos = [];
    newSelectedPhotos.push(e.target.value);
    addSiblingsToNewPhotos(e.target, newSelectedPhotos);

    newPhotos.length === 3 ? setNewPhotos(newSelectedPhotos) : setPhotos(newSelectedPhotos);
  }

  function selectPhotos(item) {
    let array = [];
    if (item.length === 3) {
      for (let i = 0; i < item.length; i++) {
        array = [...array, item[i]];
      }
      setNewPhotos(array);
    } else {
      toast.error("You must choose 3 product photo");
    }
  }
  return (
    <Modal show={modalDisplay} onHide={() => setModalDisplay(false)}>
      <Modal.Header closeButton>{`Update Product`}</Modal.Header>
      <Modal.Body className="">
        <form className="d-flex flex-column align-items-center" onSubmit={formSubmit}>
          <h4>Update Product</h4>
          <select
            required
            defaultValue={mainId}
            id="upname"
            className="row w-75 mb-3 mt-4"
            name="main"
            onChange={(e) => setMainId(e.target.value)}
            style={{ height: "35px" }}
          >
            {Mains.map((main) => (
              <option key={main.id} value={main.id}>
                {main.name}
              </option>
            ))}
          </select>

          <select
            required
            className="row w-75 mb-3"
            name="sub"
            onChange={(e) => setSubId(e.target.value)}
            style={{ height: "35px" }}
            defaultValue={subId ? subId : ""}
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

          <label htmlFor="imgInpUpdate" className="selectLabel mb-4" style={{ textDecoration: "underline" }}>
            <i>You can choose new product photos </i>
          </label>
          <input className="w-75 " accept="image/*" hidden type="file" id="imgInpUpdate" multiple onChange={(e) => selectPhotos(e.target.files)} />

          {photos && photos.length === 3 && (
            <div className="changeMainPhoto d-flex-flex-column mb-5">
              <div className="row mx-0 px-0">
                <div className="col-4">Main</div>
                <div className="col-4">Second</div>
                <div className="col-4">Third</div>
              </div>
              <div className="row mx-0 px-0 border">
                <img
                  id="pu-img-0"
                  alt="product resim"
                  style={{ objectFit: "contain", maxHeight: "175px" }}
                  className="col-4 border border-dark border-2"
                  onClick={(e) => changeMainPhoto(e)}
                />
                <img
                  id="pu-img-1"
                  alt="product resim"
                  style={{ objectFit: "contain", maxHeight: "175px" }}
                  className="col-4"
                  onClick={(e) => changeMainPhoto(e)}
                />
                <img
                  id="pu-img-2"
                  alt="product resim"
                  style={{ objectFit: "contain", maxHeight: "175px" }}
                  className="col-4"
                  onClick={(e) => changeMainPhoto(e)}
                />
              </div>
              <i style={{ opacity: "0.7" }}>You can set the photo you clicked as the main photo</i>
            </div>
          )}

          <Button type="submit" variant="success" className="w-50 mb-4">
            Update Product
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateModal;
