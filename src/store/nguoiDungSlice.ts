import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NguoiDung {
  tenNguoiDung:  string | null; // Sử dụng kiểu union string | null
  matKhau: string;
}

interface NguoiDungState {
  currentUser: NguoiDung | null;
  error: string | null;
}

const initialState: NguoiDungState = {
  currentUser: null,
  error: null,
};

const nguoiDungSlice = createSlice({
  name: 'nguoiDung',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NguoiDung>) => {
      state.currentUser = {
        tenNguoiDung: action.payload.tenNguoiDung !== null ? action.payload.tenNguoiDung : '',
        matKhau: action.payload.matKhau,
      };
      state.error = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setError, clearError } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
