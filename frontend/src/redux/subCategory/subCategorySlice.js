import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subCategoryServices from "./subCategoryServices";

export const getAllSubs = createAsyncThunk("subcategory/getAllSubs", async (_, { rejectWithValue }) => {
  return await subCategoryServices
    .getAllSubs()
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

export const addSubCategory = createAsyncThunk("subcategory/addSubCategory", async (data, { rejectWithValue }) => {
  return await subCategoryServices
    .addSubCategory(data)
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

export const updateSubCategory = createAsyncThunk("subcategory/updateSubCategory", async (target, { rejectWithValue }) => {
  return await subCategoryServices
    .updateSubCategory(target.id, target.data)
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

export const deleteSubCategory = createAsyncThunk("subcategory/deleteSubCategory", async (id, { rejectWithValue }) => {
  return await subCategoryServices
    .deleteSubCategory(id)
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

export const subCategorySlice = createSlice({
  name: "subcategory",
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
    [getAllSubs.pending]: (state, action) => {
      state.isLoading = "get";
    },
    [getAllSubs.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list = action.payload;
      state.getError = false;
    },
    [getAllSubs.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.getError = action.payload;
    },

    //******************************************************************************* */

    [addSubCategory.pending]: (state, action) => {
      state.isLoading = "add";
    },
    [addSubCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list.push(action.payload);
      state.addError = false;
    },
    [addSubCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.addError = action.payload;
    },

    //********************************************************************************* */

    [updateSubCategory.pending]: (state, action) => {
      state.isLoading = "update";
    },
    [updateSubCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      let index = state.list.findIndex((sub) => sub.id === action.payload.id);
      state.list[index] = action.payload;
      state.updateError = false;
    },
    [updateSubCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.updateError = action.payload;
    },

    //********************************************************************************* */

    [deleteSubCategory.pending]: (state, action) => {
      state.isLoading = "delete";
    },
    [deleteSubCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      function check(main) {
        return main.id !== action.payload.id;
      }
      state.list = state.list.filter(check);
      state.deleteError = false;
    },
    [deleteSubCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.deleteError = action.payload;
    },
  },
});

export default subCategorySlice.reducer;
