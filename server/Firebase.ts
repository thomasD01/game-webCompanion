import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCxbZbVpK_yqPz1YDjxFR2qFUPaAnx7Ufk",
  authDomain: "companion-d6c91.firebaseapp.com",
  projectId: "companion-d6c91",
  storageBucket: "companion-d6c91.appspot.com",
  messagingSenderId: "688410764643",
  appId: "1:688410764643:web:5f1730a382473ad10a5f56",
  measurementId: "G-8GW9GGDD8F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = () => getAnalytics(app);
const database = getDatabase(app);
const firestore = getFirestore(app);


const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name:string, email:string, password:string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(firestore, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  analytics,
  auth,
  database,
  firestore,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
