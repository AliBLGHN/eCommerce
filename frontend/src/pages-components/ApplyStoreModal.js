import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { me, logout } from "../redux/auth/authSlice";
import { applyForStore } from "../redux/tmpStore/tmpStoreSlice";
import { useDispatch } from "react-redux";

const theme = createTheme();

function ApplyStoreModal() {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [checkUser, setCheckUser] = useState("");

  const applyStore = async () => {
    await dispatch(me())
      .unwrap()
      .then((response) => {
        console.log(response);
        setCheckUser(response);
      })
      .catch((error) => {
        toast.error("Token expired, please relogin");
        dispatch(logout());
      });
  };

  useEffect(() => {
    if (!checkUser.store_id) {
      if (!checkUser.tmpstore && checkUser !== "") {
        setModalDisplay(true);
      }
      if (checkUser.tmpstore) {
        toast("Mağaza başvurunuz alındı.\nAdmin onayı bekleniyor...", { icon: "⏳" });
      }
    } else if (checkUser.user_level === 1) {
      toast.success("Mağaza başvurunuz admin tarfından onaylandı.\nPanele erişmek için tekrar giriş yapınız.");
    }
  }, [checkUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      user_id: checkUser.id,
      name: storeName,
      email: storeEmail,
      address: storeAddress,
      phone: storePhone,
    };

    if (storeName && storeEmail && storeAddress && storePhone && checkUser) {
      await dispatch(applyForStore(data))
        .unwrap()
        .then((response) => {
          setModalDisplay(false);
          toast.success("Store application succesful.");
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("You must fill in all fields");
    }
  };

  return (
    <>
      <span onClick={() => applyStore()}>
        <StorefrontIcon /> Apply For Store
      </span>

      <Modal show={modalDisplay} onHide={() => setModalDisplay(false)} style={{ maxHeight: "100%" }}>
        <Modal.Header closeButton>Apply For Store</Modal.Header>

        <Container>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StorefrontIcon sx={{ fontSize: 100 }} />
              <Typography component="h1" variant="h3">
                Apply Store
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Store Name"
                  name="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Store e-mail"
                  name="storeEmail"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Store Address"
                  name="storeAddress"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Store Phone"
                  name="storePhone"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 1 }}>
                  Apply for store
                </Button>
              </Box>
            </Box>
          </ThemeProvider>
        </Container>
      </Modal>
    </>
  );
}

export default ApplyStoreModal;
