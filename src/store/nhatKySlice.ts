import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export type TableDataItemNhatKy = {
  key: string;
  tenDN: string;
  ngayTD: string;
  tgTD: string;
  ipThucHien: string;
  tenThaoTac: string;
};

export type State = {
  nhatKyList: TableDataItemNhatKy[];
};

const nhatKySlice = createSlice({
  name: 'nhatKy',
  initialState: {
    nhatKyList: [],
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemNhatKy[]>) => {
      state.nhatKyList = action.payload;
    },
  },
});

export const { setData } = nhatKySlice.actions;

export const fetchDataFromFirebase = () => {
    return async (dispatch: Dispatch<any>) => {
      try {
        const querySnapshot = await getDocs(collection(db, 'nhatKy'));
  
        const data = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        })) as TableDataItemNhatKy[];
  
        dispatch(setData(data));
      } catch (error) {
        console.log('Error fetching data from Firebase:', error);
      }
    };
  };


export default nhatKySlice.reducer;
