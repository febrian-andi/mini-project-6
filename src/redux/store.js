import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./products/productsSlice";
import menuReducer from "./menu/menuSlice";
import logReducer from "./logs/logsSlice";

const activeMenuPersistConfig = {
  key: "activeMenu",
  storage,
};
const persitedActiveMenuReducer = persistReducer(
  activeMenuPersistConfig,
  menuReducer
);

const rootReducer = combineReducers({
  activeMenu: persitedActiveMenuReducer,
  product: productReducer,
  log: logReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
