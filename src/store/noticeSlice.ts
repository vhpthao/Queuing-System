import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export type TypeDataThongBao = {
  key: string;
  hoTen: string;
  ngayCapSoMoi: string;
  tgCapSoMoi: string;
};

export type State = {
    thongBaoList: TypeDataThongBao[];
  };
  
  const noticeSlice = createSlice({
    name: 'thongBao',
    initialState: {
      thongBaoList: [],
    } as State,
    reducers: {
      setData: (state, action: PayloadAction<TypeDataThongBao[]>) => {
        state.thongBaoList = action.payload;
      },
    },
  });
  
  export const { setData } = noticeSlice.actions;
  
  export const fetchDataFromFirebase = () => {
    return async (dispatch: Dispatch<any>) => {
      try {
        const querySnapshot = await getDocs(collection(db, 'thongBao'));
    
        const data = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        })) as TypeDataThongBao[];
    
        dispatch(setData(data)); 
      } catch (error) {
        console.log('Error fetching data from Firebase:', error);
      }
    };
  };
  
  export default noticeSlice.reducer;
