
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVvh0sWRrgvZ_hwzZbOJJxuaENuU_GPTg",
  authDomain: "java24-ajs-slutprojekt.firebaseapp.com",
  databaseURL: "https://java24-ajs-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "java24-ajs-slutprojekt",
  storageBucket: "java24-ajs-slutprojekt.firebasestorage.app",
  messagingSenderId: "724203277917",
  appId: "1:724203277917:web:9849c23dc3563d55aa87b4",
  measurementId: "G-F3KKQX1G11"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export { database };