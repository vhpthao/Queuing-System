import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export type TableDataItemUserLog = {
  key: string;
  tenDN: string;
  ngayTD: string;
  tgTD: string;
  ipThucHien: string;
  tenThaoTac: string;
};

export type State = {
  userLogList: TableDataItemUserLog[];
};

const userLogSlice = createSlice({
  name: 'nhatKy',
  initialState: {
    userLogList: [],
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemUserLog[]>) => {
      state.userLogList = action.payload;
    },
  },
});

export const { setData } = userLogSlice.actions;


export const fetchDataFromFirebase = () => {
    return async (dispatch: Dispatch<any>) => {
      try {
        const querySnapshot = await getDocs(collection(db, 'nhatKy'));
  
        const data = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        })) as TableDataItemUserLog[];
  
        dispatch(setData(data));
      } catch (error) {
        console.log('Error fetching data from Firebase:', error);
      }
    };
  };

export default userLogSlice.reducer;
