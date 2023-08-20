import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemDichVu = {
  key: string;
  maDV: string;
  tenDV: string;
  moTa: string;
  trangThaiHD: string;
};

export type State = {
  dichVuList: TableDataItemDichVu[];
  selectedDV: TableDataItemDichVu | null; 
  isUpdating: boolean;
};

const dichVuSlice = createSlice({
  name: 'dichVu',
  initialState: {
    dichVuList: [],
    selectedDV: null, 
    isUpdating: false,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemDichVu[]>) => {
      state.dichVuList = action.payload;
    },
    setSelectedDV: (state, action: PayloadAction<TableDataItemDichVu | null>) => {
      state.selectedDV = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedDV, setIsUpdating } = dichVuSlice.actions;


export const fetchDataFromFirebaseDV = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'dichVu'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemDichVu[];

      dispatch(setData(data));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};


export const selectDV = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const dichVuCollection = collection(db, 'dichVu');
      const thietBiDoc = doc(dichVuCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(thietBiDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemDichVu;
        dispatch(setSelectedDV(selectedData));
        dispatch(setIsUpdating(true)); 
      } else {
        dispatch(setSelectedDV(null));
      }
    } catch (error) {
      console.log('Error selecting thiet bi:', error);
    }
  };
};

export default dichVuSlice.reducer;
