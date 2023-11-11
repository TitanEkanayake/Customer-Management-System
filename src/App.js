import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import UserListing from "./Components/UserListing";
import AddUser from "./Components/AddUser";
import UpdateUser from "./Components/UpdateUser";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Signup from "./Components/Signup";
import StaffUserListing from "./Components/StaffUserListing";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <div className="header">
          <Link to={"/"}>Home</Link>
          <Link to={"/user"}>User</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/user/:id" element={<UserListing />}></Route>
          <Route
            path="/staffuserlist/:id"
            element={<StaffUserListing />}
          ></Route>
          <Route path="/user/add" element={<AddUser />}></Route>
          <Route path="/user/edit/:code" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="toast-position"
        position="bottom-right"
      ></ToastContainer>
    </Provider>
  );
}

export default App;
