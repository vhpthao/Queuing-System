import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemDevice = {
  key: string;
  maTB: string;
  tenTB: string;
  dcIP: string;
  loaiTB: string;
  tenDN: string;
  matKhau: string;
  ttHD: string;
  ttKN: string;
  dvSD: string;
};

export type State = {
  deviceList: TableDataItemDevice[];
  selectedDevice: TableDataItemDevice | null;
  isUpdating: boolean; 
};

const deviceSlice = createSlice({
  name: 'thietBi',
  initialState: {
    deviceList: [],
    selectedDevice: null, 
    isUpdating: false,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemDevice[]>) => {
      state.deviceList = action.payload;
    },
    setSelectedTB: (state, action: PayloadAction<TableDataItemDevice | null>) => {
      state.selectedDevice = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedTB, setIsUpdating } = deviceSlice.actions;

export const fetchDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'thietBi'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemDevice[];

      dispatch(setData(data)); 
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};

export const selectDevice = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const deviceCollection = collection(db, 'thietBi');
      const deviceDoc = doc(deviceCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(deviceDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemDevice;
        dispatch(setSelectedTB(selectedData));
        dispatch(setIsUpdating(true));
      } else {
        dispatch(setSelectedTB(null));
      }
    } catch (error) {
      console.log('Error selecting device:', error);
    }
  };
};

export default deviceSlice.reducer;
