// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; 2025 Gerenciador de Pagamentos. Todos os direitos reservados.</p>
                <div className="footer-links">
                    <a href="/privacy-policy">Política de Privacidade</a>
                    <a href="/terms">Termos de Uso</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
