// src/services/firestoreService.js
import { db } from "../firebaseConfig"; // Certifique-se de importar corretamente sua configuração do Firebase
import { collection, addDoc } from "firebase/firestore";

// Função para adicionar uma pessoa
export const addPerson = async (name, cpf, address, houseNumber, paid) => {
    try {
        const collectionName = paid ? "paid" : "unpaid"; // Define a coleção dependendo se a pessoa pagou ou não
        const docRef = await addDoc(collection(db, collectionName), {
            name,
            cpf,
            address,
            houseNumber,
            paid,
            createdAt: new Date(),
        });
        console.log("Pessoa adicionada com ID: ", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar pessoa: ", e);
    }
};
