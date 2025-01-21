// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/dashboard");
    };

    return (
        <div className="home-container">
            <h1>Bem-vindo ao Gerenciador de Pagamentos</h1>
            <p>Comece agora a gerenciar seus pagamentos de forma fácil e eficiente.</p>
            <button className="start-button" onClick={handleStart}>
                Começar gerenciamento
            </button>
        </div>
    );
};

export default Home;
