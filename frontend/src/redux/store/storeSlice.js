import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeServices from "./storeServices";

export const getStores = createAsyncThunk("store/getStores", async (_, { rejectWithValue }) => {
  return await storeServices
    .getStores()
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    });
});

export const bannedStore = createAsyncThunk("store/bannedStore", async (id, { rejectWithValue }) => {
  return await storeServices
    .bannedStore(id)
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    });
});

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    list: [],
    isLoading: false,
    getError: null,
    addError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: {
    [getStores.pending]: (state, action) => {
      state.isLoading = "get";
    },
    [getStores.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list = action.payload;
      state.getError = false;
    },
    [getStores.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.getError = action.payload;
    },

    //******************************************************************************* */

    [bannedStore.fulfilled]: (state, action) => {
      console.log(action.payload);
      function check(store) {
        return store.id !== action.payload;
      }
      state.list = state.list.filter(check);
      state.rejectError = false;
    },
    [bannedStore.rejected]: (state, action) => {
      console.log(action.payload);
      state.rejectError = action.payload;
    },
  },
});

export default storeSlice.reducer;
