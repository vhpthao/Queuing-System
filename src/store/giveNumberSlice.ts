import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

const fieldToOrderBy = 'stt';

export type TableDataItemGiveNumber = {
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
  giveNumberList: TableDataItemGiveNumber[];
  selectedGiveNumber: TableDataItemGiveNumber | null;
  isUpdating: boolean;
  lastSTT: number;
};

const giveNumberSlice = createSlice({
  name: 'capSo',
  initialState: {
    giveNumberList: [],
    selectedGiveNumber: null,
    isUpdating: false,
    lastSTT: 0,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemGiveNumber[]>) => {
      state.giveNumberList = action.payload;
    },
    setSelectedGiveNumber: (state, action: PayloadAction<TableDataItemGiveNumber | null>) => {
      state.selectedGiveNumber = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setLastSTT: (state, action: PayloadAction<number>) => {
      state.lastSTT = action.payload;
    },
  },
});

export const { setData, setSelectedGiveNumber, setIsUpdating, setLastSTT } = giveNumberSlice.actions;

export const fetchDataFromFirebaseCS = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
        const stt = query(collection(db, 'capSo'), orderBy(fieldToOrderBy, 'asc'));
        const querySnapshot = await getDocs(stt);

      const data = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      })) as TableDataItemGiveNumber[];

      dispatch(setData(data)); 

      const maxSoThuTu = Math.max(...data.map((item) => parseInt(item.stt, 10)));
      dispatch(setLastSTT(maxSoThuTu));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};

export const selectCS = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const giveNumberCollection = collection(db, 'capSo');
      const giveNumberDoc = doc(giveNumberCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(giveNumberDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemGiveNumber;
        dispatch(setSelectedGiveNumber(selectedData));
        dispatch(setIsUpdating(true));
      } else {
        dispatch(setSelectedGiveNumber(null));
      }
    } catch (error) {
      console.log('Error selecting cap so:', error);
    }
  };
};

export const getLastSoThuTuForService = (maDV: string, capSoList: TableDataItemGiveNumber[]): string => {
  const filteredList = capSoList.filter((item) => item.tenDV === maDV);
  const sortedList = filteredList.sort((a, b) => parseInt(b.stt) - parseInt(a.stt));
  const lastItem = sortedList[0];

  if (lastItem) {
    return lastItem.stt;
  } else {
    return '0000';
  }
};

export default giveNumberSlice.reducer;
