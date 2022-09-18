import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import mainCategorySlice from "../mainCategory/mainCategorySlice";
import subCategorySlice from "../subCategory/subCategorySlice";
import tmpStoreSlice from "../tmpStore/tmpStoreSlice";
import productSlice from "../product/productSlice";
import storeSlice from "../store/storeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    maincategory: mainCategorySlice,
    subcategory: subCategorySlice,
    tmpstore: tmpStoreSlice,
    store: storeSlice,
    product: productSlice,
  },
});
