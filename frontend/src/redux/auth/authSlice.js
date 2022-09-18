import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";
import toast from "react-hot-toast";
import jwt from "jwt-decode";

export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
  return await authServices
    .loginUser(user)
    .then((response) => {
      console.log(response);
      localStorage.setItem("jwtToken", response.data.token);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authServices
    .logoutUser()
    .then((response) => {
      localStorage.removeItem("jwtToken");
    })
    .catch((error) => {
      localStorage.removeItem("jwtToken");
    });
});

export const register = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
  return await authServices
    .registerUser(user)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const me = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  console.log("asd");
  return await authServices
    .me()
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return rejectWithValue(error.response.data);
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("jwtToken") ? jwt(localStorage.getItem("jwtToken")).user : null,
    token: localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken") : null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user = jwt(action.payload.token).user;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
