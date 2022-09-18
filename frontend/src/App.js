import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./pages-components/NavigationBar";
import Admin from "./pages-components/Admin";
import StoreManage from "./pages-components/StoreManage";
import Home from "./pages-components/Home";
import AxiosConfig from "./services/AxiosConfig";
import PrivateRoute from "./services/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Footer from "./pages-components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <div className="App" style={{ flex: "1 0 auto" }}>
        <Toaster toastOptions={{ style: { marginTop: "45px", marginRight: "45px" } }} position="top-right" reverseOrder={false} />
        <Router>
          <NavigationBar />
          <Routes>
            <Route element={<AxiosConfig />}>
              <Route element={<PrivateRoute />}>
                <Route exact path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/store" element={<StoreManage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
