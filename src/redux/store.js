import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/taskSlice";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import modalSlice from "./features/modalSlice";

const resetModalTransform = createTransform(
  (inboundState, key) => inboundState,
  (outboundState, key) => {
    if (key === "modal") {
      return {
        ...outboundState,
        isOpen: false,
        modalFor: '',
      };
    }
    return outboundState;
  },
  { whitelist: ["modal"] }
);

const rootReducer = combineReducers({
  tasks: tasksSlice,
  modal: modalSlice,
});

const persistConfig = {
  key: "tasks",
  storage,
  transforms: [resetModalTransform],
  whitelist: ["tasks", "modal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
