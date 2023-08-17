import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; 

export type TableDataItemNguoiDung = {
  key: string;
  hoTen: string;
  vaiTro: string;
  trangThaiHD: string;
  tenDN: string;
  sdt: string;
  email: string;
  hinh: any;
};


export type NguoiDungState = {
  nguoiDungList: TableDataItemNguoiDung[];
  selectedND: TableDataItemNguoiDung | null;
  isUpdating: boolean;
  currentUser: TableDataItemNguoiDung | null; 

};

const nguoiDungSlice = createSlice({
  name: 'nguoiDung',
  initialState: {
    nguoiDungList: [],
    selectedND: null,
    isUpdating: false,
    currentUser: null, 
    vaiTroList: [], 
  } as NguoiDungState,
  reducers: {
    setNguoiDungData: (state, action: PayloadAction<TableDataItemNguoiDung[]>) => {
      state.nguoiDungList = action.payload;
    },
    setSelectedND: (state, action: PayloadAction<TableDataItemNguoiDung | null>) => {
      state.selectedND = action.payload;
    },
    setIsUpdatingND: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<TableDataItemNguoiDung | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setNguoiDungData, setSelectedND, setIsUpdatingND,setCurrentUser } = nguoiDungSlice.actions;

export const fetchNguoiDungDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'nguoiDung'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemNguoiDung[];

      dispatch(setNguoiDungData(data));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};


export const selectND = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const nguoiDungCollection = collection(db, 'nguoiDung');
      const nguoiDungDoc = doc(nguoiDungCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(nguoiDungDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemNguoiDung;
        dispatch(setSelectedND(selectedData));
        dispatch(setIsUpdatingND(true));
      } else {
        dispatch(setSelectedND(null));
      }
    } catch (error) {
      console.log('Error selecting nguoidung:', error);
    }
  };
};

export default nguoiDungSlice.reducer;
