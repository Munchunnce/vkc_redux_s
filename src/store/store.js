import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import productReducer from './productSlice';

// Redux Persist Imports 👇
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import { combineReducers } from "redux";

// Create root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only cart will be persisted
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Fix: Configure Store with middleware override
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
