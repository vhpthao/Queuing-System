import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

const fieldToOrderBy = 'stt';

export type TableDataItemCapSo = {
  key: string;
  stt: string;
  tenKH: string;
  tenDV: string;
  tgCap: string;
  ngayCap: string;
  tgSD: string;
  ngaySD: string;
  trangThai: string;
  email: string;
  sdt: string;
  nguonCap: string;
};

export type State = {
  capSoList: TableDataItemCapSo[];
  selectedCapSo: TableDataItemCapSo | null;
  isUpdating: boolean;
  lastSoThuTu: number;
};

const capSoSlice = createSlice({
  name: 'capSo',
  initialState: {
    capSoList: [],
    selectedCapSo: null,
    isUpdating: false,
    lastSoThuTu: 0,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemCapSo[]>) => {
      state.capSoList = action.payload;
    },
    setSelectedCapSo: (state, action: PayloadAction<TableDataItemCapSo | null>) => {
      state.selectedCapSo = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setLastSoThuTu: (state, action: PayloadAction<number>) => {
      state.lastSoThuTu = action.payload;
    },
  },
});

export const { setData, setSelectedCapSo, setIsUpdating, setLastSoThuTu } = capSoSlice.actions;

export const fetchDataFromFirebaseCS = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
        const stt = query(collection(db, 'capSo'), orderBy(fieldToOrderBy, 'asc'));
        const querySnapshot = await getDocs(stt);
      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemCapSo[];

      dispatch(setData(data));

      const maxSoThuTu = Math.max(...data.map((item) => parseInt(item.stt, 10)));
      dispatch(setLastSoThuTu(maxSoThuTu));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};

export const selectCS = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const capSoCollection = collection(db, 'capSo');
      const capSoDoc = doc(capSoCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(capSoDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemCapSo;
        dispatch(setSelectedCapSo(selectedData));
        dispatch(setIsUpdating(true)); 
      } else {
        dispatch(setSelectedCapSo(null));
      }
    } catch (error) {
      console.log('Error selecting cap so:', error);
    }
  };
};

export const getLastSoThuTuForService = (maDV: string, capSoList: TableDataItemCapSo[]): string => {
  const filteredList = capSoList.filter((item) => item.tenDV === maDV);
  const sortedList = filteredList.sort((a, b) => parseInt(b.stt) - parseInt(a.stt));
  const lastItem = sortedList[0];

  if (lastItem) {
    return lastItem.stt;
  } else {
    return '0000';
  }
};

export default capSoSlice.reducer;