import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { login, register } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import toast from "react-hot-toast";

const theme = createTheme();

function LoginRegisterModal() {
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [formIsRegister, setFormIsRegister] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [cpasswordInput, setCpasswordInput] = useState("");

  const changeModalDisplay = (e) => {
    setModalDisplay(!modalDisplay);
    setFormIsRegister(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailInput && passwordInput) {
      if (formIsRegister) {
        if (nameInput && cpasswordInput) {
          if (cpasswordInput === passwordInput) {
            await dispatch(register({ name: nameInput, email: emailInput, password: passwordInput }))
              .unwrap()
              .then((response) => {
                toast.success("Successfully registered.");
                setFormIsRegister(false);
              })
              .catch((error) => {
                toast.error(error);
              });
          } else {
            toast.error("You must fill in all fields");
          }
        } else {
          toast.error("Password does not match !");
        }
      } else {
        await dispatch(login({ email: emailInput, password: passwordInput }))
          .unwrap()
          .then((response) => {
            toast.success("Successfully logged in.");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    } else {
      toast.error("You must fill in all fields");
    }
  };

  return (
    <>
      <span className="btn" onClick={changeModalDisplay}>
        <LoginIcon /> Login
      </span>
      <Modal show={modalDisplay} onHide={changeModalDisplay}>
        <Modal.Header closeButton></Modal.Header>
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
              <Typography component="h1" variant="h3">
                {formIsRegister ? "Sign Up" : "Sign In"}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                {formIsRegister && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                {formIsRegister && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pconfirm"
                    label="Password Confirm"
                    type="password"
                    value={cpasswordInput}
                    onChange={(e) => setCpasswordInput(e.target.value)}
                  />
                )}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 1 }}>
                  {formIsRegister ? "Register" : "Login"}
                </Button>
                <span onClick={() => setFormIsRegister(!formIsRegister)}>
                  {!formIsRegister ? "Click to register" : "Are you already registered ? click to login.  "}
                </span>
              </Box>
            </Box>
          </ThemeProvider>
        </Container>
      </Modal>
    </>
  );
}

export default LoginRegisterModal;
