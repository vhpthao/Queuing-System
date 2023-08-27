import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userReducer from './userSlice';
import deviceReducer from './deviceSlice';
import serviceReducer from './serviceSlice';
import roleReducer from './roleSlice'
import giveNumberReducer from './giveNumberSlice';
import userLogReducer from './userLogSlice';
import noticeReducer from './noticeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    device: deviceReducer,
    service: serviceReducer,
    giveNumber: giveNumberReducer,
    userLog: userLogReducer,
    notice: noticeReducer,
  },

  middleware: [thunkMiddleware],
  
});

export default store;
