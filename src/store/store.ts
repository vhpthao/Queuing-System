import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import nguoiDungReducer from './nguoiDungSlice';
import thietBiReducer from './thietBiSlice';
import dichVuReducer from './dichVuSlice';
import vaiTroReducer from './vaiTroSlice'
import capSoReducer from './capSoSlice';

const store = configureStore({
  reducer: {
    nguoiDung: nguoiDungReducer,
    vaiTro: vaiTroReducer,
    thietBi: thietBiReducer,
    dichVu: dichVuReducer,
    capSo: capSoReducer,
  },
  middleware: [thunkMiddleware],
  
});

export default store;
