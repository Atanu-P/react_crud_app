import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCalUoDlV2X509zhFdzLGiX_qO2riE-C-I",

  authDomain: "vue-my-app-1da88.firebaseapp.com",

  databaseURL: "https://vue-my-app-1da88-default-rtdb.firebaseio.com",

  projectId: "vue-my-app-1da88",

  storageBucket: "vue-my-app-1da88.appspot.com",

  messagingSenderId: "20979877302",

  appId: "1:20979877302:web:a9d22da74fab0a9bb82d17",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
