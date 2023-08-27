import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { collection, getDocs, DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'; // Cần import DocumentSnapshot và Firestore
import { db } from '../firebase/firebaseConfig';

export type TableDataItemRole = {
  key: string;
  tenVT: string;
  soND: string;
  moTa: string;
};

export type State = {
  roleList: TableDataItemRole[];
  selectedRole: TableDataItemRole | null;
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

const roleSlice = createSlice({
  name: 'vaiTro',
  initialState: {
    roleList: [],
    selectedRole: null,
    isUpdating: false,
  } as State,
  reducers: {
    setData: (state, action: PayloadAction<TableDataItemRole[]>) => {
      state.roleList = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<TableDataItemRole | null>) => {
      state.selectedRole = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
});

export const { setData, setSelectedRole, setIsUpdating } = roleSlice.actions;


export const fetchDataFromFirebase = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vaiTro'));

      const data = querySnapshot.docs.map(async (doc) => {
        const roleData = doc.data() as TableDataItemRole;
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
        const selectedData = docSnapshot.data() as TableDataItemRole;
        dispatch(setSelectedRole(selectedData));
        dispatch(setIsUpdating(true)); 
      } else {
        dispatch(setSelectedRole(null));
      }
    } catch (error) {
      console.log('Error selecting role:', error);
    }
  };
};

export default roleSlice.reducer;
