import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemVaiTro = {
  key: string;
  tenVT: string;
  soND: string;
  moTa: string;
};

export type State = {
  vaiTroList: TableDataItemVaiTro[];
  selectedVT: TableDataItemVaiTro | null;
  isUpdating: boolean;
};

const countUsersInRole = async (role: string): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'nguoiDung'));
    let count = 0;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.vaiTro === role) {
        count++;
      }
    });

    return count;
  } catch (error) {
    console.log('Error counting users in role:', error);
    return 0;
  }
};

const vaiTroSlice = createSlice({
  name: 'vaiTro',
  initialState: {
    vaiTroList: [],
    selectedVT: null,
    isUpdating: false,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemVaiTro[]>) => {
      state.vaiTroList = action.payload;
    },
    setSelectedVT: (state, action: PayloadAction<TableDataItemVaiTro | null>) => {
      state.selectedVT = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedVT, setIsUpdating } = vaiTroSlice.actions;


export const fetchDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vaiTro'));

      const data = querySnapshot.docs.map(async (doc) => {
        const roleData = doc.data() as TableDataItemVaiTro;
        const userCount = await countUsersInRole(roleData.tenVT);
        roleData.soND = userCount.toString();
        roleData.key = doc.id;
        return roleData;
      });

      const resolvedData = await Promise.all(data);

      dispatch(setData(resolvedData));
    } catch (error) {
      console.log('Error fetching data from Firebase:', error);
    }
  };
};

export const selectVT = (key: string) => {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const vaiTroCollection = collection(db, 'vaiTro');
      const vaiTroDoc = doc(vaiTroCollection, key);
      const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(vaiTroDoc);

      if (docSnapshot.exists()) {
        const selectedData = docSnapshot.data() as TableDataItemVaiTro;
        dispatch(setSelectedVT(selectedData));
        dispatch(setIsUpdating(true)); 
      } else {
        dispatch(setSelectedVT(null));
      }
    } catch (error) {
      console.log('Error selecting vai tro:', error);
    }
  };
};

export default vaiTroSlice.reducer;
