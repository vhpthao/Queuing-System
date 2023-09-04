import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import deviceReducer from './deviceSlice';
import serviceReducer from './serviceSlice';
import roleReducer from './roleSlice';
import giveNumberReducer from './giveNumberSlice';
import userLogReducer from './userLogSlice';
import noticeReducer from './noticeSlice';

// Kết hợp tất cả các reducers thành một rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  role: roleReducer,
  device: deviceReducer,
  service: serviceReducer,
  giveNumber: giveNumberReducer,
  userLog: userLogReducer,
  notice: noticeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware],
});

export const persistor = persistStore(store);

export default store;
