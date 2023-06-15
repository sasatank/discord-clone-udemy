
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import  { GoogleAuthProvider, getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyDHyubFzzilTF1A3wbuGTtyociWsyl-Y5Q",
  authDomain: "discord-clone-udemy-a0d8c.firebaseapp.com",
  projectId: "discord-clone-udemy-a0d8c",
  storageBucket: "discord-clone-udemy-a0d8c.appspot.com",
  messagingSenderId: "1025104506194",
  appId: "1:1025104506194:web:4c983056429db38ca65e8b",
  measurementId: "G-625KNQ1MV1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth,provider,db };