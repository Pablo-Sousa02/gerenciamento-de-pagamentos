import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AddPerson from "./pages/AddPerson";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Atualiza o estado com o usuário autenticado
    });

    return () => unsubscribe(); // Limpa a assinatura quando o componente for desmontado
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      
      <Routes>
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-person" element={user ? <AddPerson /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <Navigate to="/" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
