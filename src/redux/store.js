import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import { setupListeners } from "@reduxjs/toolkit/query";
import userApi from "../services/userApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "cart"],
};

const rootReducer = {

};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);


setupListeners(store.dispatch);
