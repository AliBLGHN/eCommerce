import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainCategoryServices from "./mainCategoryServices";

export const getAllMains = createAsyncThunk("maincategory/getAllMains", async (_, { rejectWithValue }) => {
  return await mainCategoryServices
    .getAllMains()
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

export const getMains = createAsyncThunk("maincategory/getMains", async (_, { rejectWithValue }) => {
  return await mainCategoryServices
    .getMains()
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

export const addMainCategory = createAsyncThunk("maincategory/addMainCategory", async (data, { rejectWithValue }) => {
  return await mainCategoryServices
    .addMainCategory(data)
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

export const updateMainCategory = createAsyncThunk("maincategory/updateMainCategory", async (target, { rejectWithValue }) => {
  return await mainCategoryServices
    .updateMainCategory(target.id, target.data)
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

export const deleteMainCategory = createAsyncThunk("maincategory/deleteMainCategory", async (id, { rejectWithValue }) => {
  return await mainCategoryServices
    .deleteMainCategory(id)
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

export const mainCategorySlice = createSlice({
  name: "maincategory",
  initialState: {
    list: [],
    listWithSubs: [],
    isLoading: false,
    getError: null,
    addError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: {
    [getAllMains.pending]: (state, action) => {
      state.isLoading = "getAll";
    },
    [getAllMains.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list = action.payload;
      state.getError = false;
    },
    [getAllMains.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.getError = action.payload;
    },

    //******************************************************************************* */

    [getMains.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.listWithSubs = action.payload;
    },

    //******************************************************************************* */

    [addMainCategory.pending]: (state, action) => {
      state.isLoading = "add";
    },
    [addMainCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.list.push(action.payload);
      state.addError = false;
    },
    [addMainCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.addError = action.payload;
    },

    //********************************************************************************* */

    [updateMainCategory.pending]: (state, action) => {
      state.isLoading = "update";
    },
    [updateMainCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      let index = state.list.findIndex((main) => main.id === action.payload.id);
      state.list[index] = action.payload;
      state.updateError = false;
    },
    [updateMainCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.updateError = action.payload;
    },

    //********************************************************************************* */

    [deleteMainCategory.pending]: (state, action) => {
      state.isLoading = "delete";
    },
    [deleteMainCategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      function check(main) {
        return main.id !== action.payload.id;
      }
      state.list = state.list.filter(check);
      state.deleteError = false;
    },
    [deleteMainCategory.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.deleteError = action.payload;
    },
  },
});

export default mainCategorySlice.reducer;
