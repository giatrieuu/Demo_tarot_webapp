import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
//Thay firebase bằng apikey của mình
const firebaseConfig = {
  apiKey: "AIzaSyBvczJhODXC1XOweFDDqkwvZuKcUqPNp9A",
  authDomain: "clonesera.firebaseapp.com",
  projectId: "clonesera",
  storageBucket: "clonesera.appspot.com",
  messagingSenderId: "275060669998",
  appId: "1:275060669998:web:594890b79df54757db69bf",
  measurementId: "G-9DY231DPQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, analytics, ref, uploadBytes, getDownloadURL };
