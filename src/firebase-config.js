import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_PQYafyUNjlgCAznC0dmry2XUPhGymTU",
  authDomain: "login-7511b.firebaseapp.com",
  databaseURL: "https://login-7511b-default-rtdb.firebaseio.com",
  projectId: "login-7511b",
  storageBucket: "login-7511b.appspot.com",
  messagingSenderId: "112406522715",
  appId: "1:112406522715:web:ca3001c59272b3088c087e",
  measurementId: "G-9JHDBLP9EG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const storage = getStorage(app);
export { app, auth };
