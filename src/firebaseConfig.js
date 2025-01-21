// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_g_NTHlRSRY5zrA7FmqgZFRk8rxS3lVQ",
    authDomain: "sistema-de-pagamento.firebaseapp.com",
    projectId: "sistema-de-pagamento",
    storageBucket: "sistema-de-pagamento.firebasestorage.app",
    messagingSenderId: "583494229044",
    appId: "1:583494229044:web:80df5cf6fa5c4ef90ffe61",
    measurementId: "G-G6BKCNCG2X"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter o Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const transferToPaid = async (id) => {
    const personRef = doc(db, "people", id);
    await updateDoc(personRef, {
        paid: true,
    });
};







