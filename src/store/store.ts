import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import nguoiDungReducer from './nguoiDungSlice';
import thietBiReducer from './thietBiSlice';
import dichVuReducer from './dichVuSlice';
import vaiTroReducer from './vaiTroSlice'
import capSoReducer from './capSoSlice';
import nhatKyReducer from './nhatKySlice';

// Tạo store Redux
const store = configureStore({
  // Cấu hình reducer cho store
  reducer: {
    nguoiDung: nguoiDungReducer,
    vaiTro: vaiTroReducer,
    thietBi: thietBiReducer,
    dichVu: dichVuReducer,
    capSo: capSoReducer,
    nhatKy: nhatKyReducer,
  },

  middleware: [thunkMiddleware],
  
});

export default store;
