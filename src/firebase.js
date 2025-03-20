import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";

  
import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";

import { toast } from "react-toastify";

  
const firebaseConfig = {
  apiKey: "AIzaSyCld6vjs_ZWRhn7PYlhX4nHi8QfY4_Uurw",
  authDomain: "netflix-clone-4dee0.firebaseapp.com",
  projectId: "netflix-clone-4dee0",
  storageBucket: "netflix-clone-4dee0.firebasestorage.app",
  messagingSenderId: "336799409522",
  appId: "1:336799409522:web:a11b8af1cb1b86fb61a9eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) =>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    // alert(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }
}

const login = async (email,password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    // alert(error); 
    toast.error(error.code.split('/')[1].split('-').join(" ")); 
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth, db, signup, login, logout}