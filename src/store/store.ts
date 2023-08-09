import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import nguoiDungReducer from './nguoiDungSlice';


const store = configureStore({

  reducer: {
    nguoiDung: nguoiDungReducer,

  },

  middleware: [thunkMiddleware],
});


export default store;
