import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcu2_oJLAu2oJrsgxRSeLOoYtyalf-t6o",
  authDomain: "queuing-system-27a54.firebaseapp.com",
  projectId: "queuing-system-27a54",
  storageBucket: "queuing-system-27a54.appspot.com",
  messagingSenderId: "523974821593",
  appId: "1:523974821593:web:4b55169e55f6481bd560c8",
  measurementId: "G-3MH7QNLVPX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Tham chiếu đến dịch vụ Firestore
export const db = getFirestore(app);
