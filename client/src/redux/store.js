import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import FormRegisterReducer from "./formRegisterSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import userReducer from "./userSlice";
import reviewProjectReducer from "./reviewProjectDetail";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "reviewProjectDetail"],
  blacklist: ["formRegister", "forgotPassword", "user", "wishlist"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  formRegister: FormRegisterReducer,
  forgotPassword: forgotPasswordReducer,
  reviewProjectDetail: reviewProjectReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
