import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemThietBi = {
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
  thietBiList: TableDataItemThietBi[];
  selectedTB: TableDataItemThietBi | null; 
  isUpdating: boolean;
};

const thietBiSlice = createSlice({
  name: 'thietBi',
  initialState: {
    thietBiList: [],
    selectedTB: null, 
    isUpdating: false, 
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemThietBi[]>) => {
      state.thietBiList = action.payload;
    },
    setSelectedTB: (state, action: PayloadAction<TableDataItemThietBi | null>) => {
      state.selectedTB = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedTB, setIsUpdating } = thietBiSlice.actions;


export const fetchDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'thietBi'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemThietBi[];

      dispatch(setData(data)); 
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};


export const selectTB = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const thietBiCollection = collection(db, 'thietBi');
      const thietBiDoc = doc(thietBiCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(thietBiDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemThietBi;
        dispatch(setSelectedTB(selectedData));
        dispatch(setIsUpdating(true));
      } else {
        dispatch(setSelectedTB(null));
      }
    } catch (error) {
      console.log('Error selecting thiet bi:', error);
    }
  };
};

export default thietBiSlice.reducer;
