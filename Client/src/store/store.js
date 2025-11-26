import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "./admin/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
  },
});

export default store;
