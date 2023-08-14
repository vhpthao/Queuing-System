import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import nguoiDungReducer from './nguoiDungSlice';
import thietBiReducer from './thietBiSlice';
import dichVuReducer from './dichVuSlice';

// Tạo store Redux
const store = configureStore({
  // Cấu hình reducer cho store
  reducer: {
    nguoiDung: nguoiDungReducer,
    thietBi: thietBiReducer,
    dichVu: dichVuReducer,
  },
  // Sử dụng middleware Redux Thunk để xử lý các action bất đồng bộ
  middleware: [thunkMiddleware],
  
});

// Xuất store để có thể sử dụng trong các thành phần khác của ứng dụng
export default store;
