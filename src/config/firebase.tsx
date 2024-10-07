import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
//Thay firebase bằng apikey của mình
const firebaseConfig = {
  apiKey: "AIzaSyC958iSG7dbufpFz3I0rKZGgTOjgvWoj3c",
  authDomain: "tarot-booking-20882.firebaseapp.com",
  projectId: "tarot-booking-20882",
  storageBucket: "tarot-booking-20882.appspot.com",
  messagingSenderId: "783136267537",
  appId: "1:783136267537:web:dc3d6d70e3a187d44d80b0",
  measurementId: "G-RQZPJPW2H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, analytics, ref, uploadBytes, getDownloadURL };
