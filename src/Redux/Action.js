import axios from "axios";
import { toast } from "react-toastify";
// import UpdateUser from "../Components/UpdateUser";
import {
  ADD_USER,
  DELETE_USER,
  FAIL_REQUEST,
  GET_USER_LIST,
  GET_USER_OBJ,
  MAKE_REQUEST,
  UPDATE_USER,
  GET_USER_LOGIN_OBJ,
  SET_USER_ID,
} from "./ActionType";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
export const geUserList = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data,
  };
};
export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};
export const getUserObj = (data) => {
  return {
    type: GET_USER_OBJ,
    payload: data,
  };
};
export const getUserLoginObj = (data) => {
  return {
    type: GET_USER_LOGIN_OBJ,
    payload: data,
  };
};
export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};

export const FetchUserList = () => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const response = await axios.get("http://localhost:8000/customers");
      const userlist = response.data;
      dispatch(geUserList(userlist));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const Removeuser = (code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.delete(`http://localhost:8000/customers/${code}`);
      dispatch(deleteUser());
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionAddUser = (data) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.post("http://localhost:8000/customers", data);
      dispatch(addUser());

      toast.success("User Added successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateUser = (data, code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.put(`http://localhost:8000/customers/${code}`, data);
      dispatch(updateUser());
      toast.success("User Updated successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FetchUserObj = (code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const res = await axios.get(`http://localhost:8000/customers/${code}`);
      const userlist = res.data;
      dispatch(getUserObj(userlist));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
export const FetchLoggedinUserObj = (id) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const res = await axios.get(`http://localhost:8000/users/${id}`);
      const userobj = res.data;
      dispatch(getUserObj(userobj));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const setUserIdAction = (userId) => {
  return (dispatch) => {
    dispatch(setUserId(userId));
  };
};

// export const FunctionSignup = (data) => {
//   return async (dispatch) => {
//     dispatch(makeRequest());

//     try {
//       await axios.post("http://localhost:8000/users", data);
//       dispatch(signupUser());

//       toast.success("Signup successful.");
//     } catch (err) {
//       dispatch(failRequest(err.message));
//     }
//   };
// };

// export const FunctionLogin = () => {
//   return async (dispatch) => {
//     dispatch(makeRequest());

//     try {
//       const response = await axios.get("http://localhost:8000/users");
//       const data = response.data;
//       dispatch(loginUser(data));
//     } catch (error) {
//       dispatch(failRequest(error.message));
//     }
//   };
// };
