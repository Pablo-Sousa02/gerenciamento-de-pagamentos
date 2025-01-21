import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Certifique-se de que este caminho está correto

const Navbar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth); // Chama o Firebase para deslogar o usuário
            setLoading(false);
            navigate("/login"); // Redireciona para a página de login
        } catch (error) {
            setLoading(false);
            console.error("Erro ao deslogar:", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = useCallback((e) => {
        if (dropdownOpen && !e.target.closest(".user-icon")) {
            setDropdownOpen(false);
        }
    }, [dropdownOpen]);

    React.useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [closeDropdown]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Gerenciador
                </Link>
                <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/dashboard" className="navbar-item">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-person" className="navbar-item">
                                Adicionar Pessoa
                            </Link>
                        </li>
                        <li>
                            <Link to="/home" className="navbar-item">
                                Home
                            </Link>
                        </li>
                        {user && (
                            <li className="logout-btn-mobile" onClick={handleLogout}>
                                {loading ? "Desconectando..." : "Logout"}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="navbar-toggle" onClick={handleMenuToggle}>
                    <span className={`toggle-icon ${menuOpen ? "open" : ""}`}>&#9776;</span>
                </div>

                {menuOpen && user && (
                    <button onClick={handleLogout} className="hamburger-logout-btn">
                        {loading ? "Desconectando..." : "Logout"}
                    </button>
                )}

                <div className="user-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={30} color="#fff" />
                    {dropdownOpen && (
                        <div className="dropdown-menu active">
                            {user ? (
                                <button onClick={handleLogout} className="dropdown-logout-btn">
                                    {loading ? "Desconectando..." : "Logout"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="dropdown-login-btn"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
