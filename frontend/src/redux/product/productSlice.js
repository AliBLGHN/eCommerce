import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "./productServices";

export const getAllProducts = createAsyncThunk("maincategory/getAllProducts", async (_, { rejectWithValue }) => {
  return await productServices
    .getAllProducts()
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const addProduct = createAsyncThunk("product/addProduct", async (data, { rejectWithValue }) => {
  return await productServices
    .addProduct(data)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (target, { rejectWithValue }) => {
  return await productServices
    .updateProduct(target)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue }) => {
  return await productServices
    .deleteProduct(id)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    });
});

export const productSlice = createSlice({
  name: "product",
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
    [getAllProducts.pending]: (state, action) => {
      state.isLoading = "getAll";
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list = action.payload;
      state.getError = false;
    },
    [getAllProducts.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.getError = action.payload;
    },

    //******************************************************************************* */

    [addProduct.pending]: (state, action) => {
      state.isLoading = "add";
    },
    [addProduct.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list.push(action.payload);
      state.addError = false;
    },
    [addProduct.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.addError = action.payload;
    },

    //******************************************************************************* */

    [updateProduct.pending]: (state, action) => {
      state.isLoading = "update";
    },
    [updateProduct.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      let index = state.list.findIndex((product) => product.id === action.payload.id);
      state.list[index] = action.payload;
      state.updateError = false;
    },
    [updateProduct.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.updateError = action.payload;
    },

    //******************************************************************************* */

    [deleteProduct.pending]: (state, action) => {
      state.isLoading = "delete";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      function check(product) {
        return product.id !== action.payload.id;
      }
      state.list = state.list.filter(check);
      state.deleteError = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.deleteError = action.payload;
    },
  },
});

export default productSlice.reducer;
