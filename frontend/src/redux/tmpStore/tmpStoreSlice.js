import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tmpStoreServices from "./tmpStoreServices";

export const getTmpStores = createAsyncThunk("tmpstore/getTmpStores", async (_, { rejectWithValue }) => {
  return await tmpStoreServices
    .getTmpStores()
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    });
});

export const applyForStore = createAsyncThunk("tmpstore/applyForStore", async (data, { rejectWithValue }) => {
  return await tmpStoreServices
    .applyForStore(data)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    });
});

export const acceptTmpStore = createAsyncThunk("tmpstore/acceptTmpStore", async (id, { rejectWithValue }) => {
  return await tmpStoreServices
    .acceptTmpStore(id)
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    });
});

export const rejectTmpStore = createAsyncThunk("tmpstore/rejectTmpStore", async (id, { rejectWithValue }) => {
  return await tmpStoreServices
    .rejectTmpStore(id)
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    });
});

export const tmpStoreSlice = createSlice({
  name: "tmpstore",
  initialState: {
    list: [],
    isLoading: false,
    getError: null,
    addError: null,
    acceptError: null,
    rejectError: null,
  },
  reducers: {},
  extraReducers: {
    [getTmpStores.pending]: (state, action) => {
      state.isLoading = "get";
    },
    [getTmpStores.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list = action.payload;
      state.getError = false;
    },
    [getTmpStores.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.getError = action.payload;
    },

    //******************************************************************************* */

    [acceptTmpStore.fulfilled]: (state, action) => {
      console.log(action.payload);
      function check(tmp) {
        return tmp.id !== action.payload;
      }
      state.list = state.list.filter(check);
      state.acceptError = false;
    },
    [acceptTmpStore.rejected]: (state, action) => {
      console.log(action.payload);
      state.acceptError = action.payload;
    },

    //********************************************************************************* */

    [rejectTmpStore.fulfilled]: (state, action) => {
      console.log(action.payload);
      function check(tmp) {
        return tmp.id !== action.payload;
      }
      state.list = state.list.filter(check);
      state.rejectError = false;
    },
    [rejectTmpStore.rejected]: (state, action) => {
      console.log(action.payload);
      state.rejectError = action.payload;
    },
  },
});

export default tmpStoreSlice.reducer;
