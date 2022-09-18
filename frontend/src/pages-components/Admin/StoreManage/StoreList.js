import Table from "react-bootstrap/Table";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useSelector, useDispatch } from "react-redux";
import { acceptTmpStore, rejectTmpStore, getTmpStores } from "../../../redux/tmpStore/tmpStoreSlice";
import { getStores, bannedStore } from "../../../redux/store/storeSlice";
import toast from "react-hot-toast";

function StoreList() {
  const dispatch = useDispatch();
  const TmpStores = useSelector((state) => state.tmpstore.list);
  const Stores = useSelector((state) => state.store.list);

  const handleAccept = (id) => {
    dispatch(acceptTmpStore(id))
      .unwrap()
      .then((response) => {
        toast.success("Store successfully accepted.");
        dispatch(getStores());
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleReject = (id) => {
    dispatch(rejectTmpStore(id))
      .unwrap()
      .then((response) => {
        toast.success("Store successfully rejected.");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleBanned = (id) => {
    dispatch(bannedStore(id))
      .unwrap()
      .then((response) => {
        toast.success("Store successfully banned.");
        dispatch(getTmpStores());
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div style={{ maxHeight: "565px", overflowY: "scroll" }} className="row newScroll">
      <Table className="mb-0">
        <thead style={{ position: "sticky", top: "0px", height: "50px" }} className=" bg-warning ">
          <tr style={{ textAlign: "center" }}>
            <th className="col-2 border border-dark">User Name</th>
            <th className="col-2 border border-dark">Store Name</th>
            <th className="col-1 border border-dark">E-mail</th>
            <th className="col-4 border border-dark">Address</th>
            <th className="col-1 border border-dark">Phone</th>
            <th className="col-2 border border-dark">Manage</th>
          </tr>
        </thead>

        <tbody>
          {TmpStores.map((tmp) => (
            <tr className="border border-warning" key={tmp.id}>
              <td className="border border-warning">{tmp.owner.name}</td>
              <td className="border border-warning">{tmp.store.name}</td>
              <td className="border border-warning">{tmp.store.email}</td>
              <td className="border border-warning">{tmp.store.address}</td>
              <td className="border border-warning">{tmp.store.phone}</td>
              <td className="d-flex border-0 justify-content-center ">
                <button className="btn btn-success" onClick={() => handleAccept(tmp.id)}>
                  <span className="d-flex">
                    <CheckIcon />
                    &nbsp;Accept
                  </span>
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleReject(tmp.id)}>
                  <span className="d-flex">
                    <DoDisturbIcon />
                    &nbsp;Reject
                  </span>
                </button>
              </td>
            </tr>
          ))}
          <tr style={{ height: 10 }}></tr>
          {Stores.map((store) => (
            <tr className="border border-success border-2" key={store.id}>
              <td className="border border-success">{store.owner.name}</td>
              <td className="border border-success">{store.name}</td>
              <td className="border border-success">{store.email}</td>
              <td className="border border-success">{store.address}</td>
              <td className="border border-success">{store.phone}</td>
              <td className="d-flex border-0 justify-content-center">
                <button className="btn btn-danger" onClick={() => handleBanned(store.id)}>
                  <span className="d-flex">
                    <DoDisturbIcon />
                    &nbsp;Suspend the store
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StoreList;
