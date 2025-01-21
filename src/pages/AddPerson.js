// src/pages/AddPerson.js
import React, { useState } from "react";
import { addPerson } from "../services/firestoreService"; // Função para adicionar pessoa
import { useNavigate } from "react-router-dom";
import "../styles/AddPerson.css"; // Importa os estilos

const AddPerson = () => {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [paid, setPaid] = useState(false); // Estado para verificar se a pessoa pagou
    const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addPerson(name, cpf, address, houseNumber, paid); // Chamada para adicionar pessoa
        setSuccessMessage("Pessoa adicionada com sucesso!"); // Define a mensagem de sucesso
        setName("");
        setCpf("");
        setAddress("");
        setHouseNumber("");
        setPaid(false);

        setTimeout(() => {
            setSuccessMessage(""); // Remove a mensagem após 3 segundos
        }, 3000);
    };

    return (
        <div className="add-person-container">
            <h2>Adicionar Pessoa</h2>
            {successMessage && (
                <div className={`success-message ${successMessage ? "show" : ""}`}>
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Número da Casa"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={paid}
                        onChange={(e) => setPaid(e.target.checked)} // Atualiza o estado 'paid'
                    />
                    <div className="checkbox-custom">
                        <i className={`fa ${paid ? "fa-check" : "fa-times"}`}></i>
                    </div>
                    Pago
                </label>
                <button type="submit">Adicionar</button>
            </form>

            {/* Botão para ir para o Dashboard */}
            <div className="go-to-dashboard-btn-container">
                <button onClick={() => navigate("/dashboard")}>Ir para o Dashboard</button>
            </div>
        </div>
    );
};

export default AddPerson;
