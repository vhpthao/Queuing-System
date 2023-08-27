import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; 

export type TableDataItemUser = {
  key: string;
  hoTen: string;
  vaiTro: string;
  trangThaiHD: string;
  tenDN: string;
  sdt: string;
  email: string;
  hinh: any;
  matKhau: string;
};


export type NguoiDungState = {
  userList: TableDataItemUser[];
  selectedUser: TableDataItemUser | null;
  isUpdating: boolean;
  currentUser: TableDataItemUser | null; 

};

const userSlice = createSlice({
  name: 'nguoiDung',
  initialState: {
    userList: [],
    selectedUser: null,
    isUpdating: false,
    currentUser: null, 
    roleList: [], 
  } as NguoiDungState,
  reducers: {
    setNguoiDungData: (state, action: PayloadAction<TableDataItemUser[]>) => {
      state.userList = action.payload;
    },
    setSelectedND: (state, action: PayloadAction<TableDataItemUser | null>) => {
      state.selectedUser = action.payload;
    },
    setIsUpdatingND: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<TableDataItemUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setNguoiDungData, setSelectedND, setIsUpdatingND,setCurrentUser } = userSlice.actions;

export const fetchNguoiDungDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'nguoiDung'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemUser[];

      dispatch(setNguoiDungData(data));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};


export const selectND = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const userCollection = collection(db, 'nguoiDung');
      const userDoc = doc(userCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemUser;
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

export default userSlice.reducer;
