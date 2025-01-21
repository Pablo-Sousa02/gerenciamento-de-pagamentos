import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "../styles/Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Verificar se o e-mail já está registrado
    const checkEmailExists = async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty; // Se houver resultados, o e-mail já existe
        } catch (err) {
            console.error("Erro ao verificar e-mail: ", err);
            return false; // Tratar como não existente em caso de erro
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            // Verificar se o e-mail já existe
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                setError("Este e-mail já está cadastrado.");
                setLoading(false);
                return;
            }

            // Cadastrar no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuário cadastrado no Auth: ", userCredential.user);

            // Adicionar ao Firestore
            await addDoc(collection(db, "users"), {
                email,
                createdAt: new Date(),
            });
            console.log("Usuário adicionado ao Firestore");

            // Exibir mensagem de sucesso
            setMessage("Cadastro realizado com sucesso! Redirecionando para o login...");

            // Redirecionar para a página de login após 2 segundos
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Erro no cadastro: ", err);
            setError("Erro ao cadastrar: " + err.message);
        } finally {
            setLoading(false); // Garantir que o botão volte ao estado normal
        }
    };

    return (
        <div className="register-container">
            <h2>Bem-vindo ao Gerenciador de Pagamentos</h2>
            <p>
                Efetue um cadastro para começar ou, se você já é usuário,
                faça login para continuar.
            </p>
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            <div className="switch-login">
                <p>
                    Já tem uma conta?{" "}
                    <button onClick={() => navigate("/login")}>Faça login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
