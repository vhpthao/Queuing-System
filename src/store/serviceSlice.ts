import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemService = {
  key: string;
  maDV: string;
  tenDV: string;
  moTa: string;
  trangThaiHD: string;
};

export type State = {
  serviceList: TableDataItemService[];
  selectedService: TableDataItemService | null; 
  isUpdating: boolean; 
};

const serviceSlice = createSlice({
  name: 'dichVu',
  initialState: {
    serviceList: [],
    selectedService: null,
    isUpdating: false, 
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemService[]>) => {
      state.serviceList = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<TableDataItemService | null>) => {
      state.selectedService = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedService, setIsUpdating } = serviceSlice.actions;


export const fetchDataFromFirebaseDV = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'dichVu'));

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemService[];

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
        const selectedData = docSnapshot.data() as TableDataItemService;
        dispatch(setSelectedService(selectedData));
        dispatch(setIsUpdating(true));
      } else {
        dispatch(setSelectedService(null));
      }
    } catch (error) {
      console.log('Error selecting thiet bi:', error);
    }
  };
};

export default serviceSlice.reducer;
