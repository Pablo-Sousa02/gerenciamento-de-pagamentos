import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";  // Importação do doc
import Modal from "../components/Modal";
import { useSpring, animated } from 'react-spring'; 
import { Link } from 'react-router-dom'; 
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [unpaidPeople, setUnpaidPeople] = useState([]);
    const [paidPeople, setPaidPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    const fetchPeople = async () => {
        const unpaidSnapshot = await getDocs(collection(db, "unpaid"));
        const paidSnapshot = await getDocs(collection(db, "paid"));

        setUnpaidPeople(unpaidSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setPaidPeople(paidSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    const handleMarkAsPaid = async (person) => {
        if (!person || !person.id) {
            return;
        }

        await addDoc(collection(db, "paid"), {
            name: person.name,
            cpf: person.cpf,
            address: person.address,
            houseNumber: person.houseNumber,
            paid: true,
        });

        await deleteDoc(doc(db, "unpaid", person.id));

        setUnpaidPeople(unpaidPeople.filter(p => p.id !== person.id)); 
        setPaidPeople([...paidPeople, person]);

        setIsModalOpen(false);
    };

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>

            <div className="add-person-btn-container">
                <Link to="/add-person">
                    <button className="btn-add-person">Adicionar Pessoa</button>
                </Link>
            </div>

            <animated.div style={fadeIn} className="card">
                <h3>Pessoas que não pagaram</h3>
                <table className="people-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unpaidPeople.map((person) => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>{person.cpf}</td>
                                <td>{person.address}</td>
                                <td>
                                    <button className="btn-info" onClick={() => handlePersonClick(person)}>
                                        Ver mais
                                    </button>
                                    <button className="btn-paid" onClick={() => handleMarkAsPaid(person)}>
                                        Marcar como pago
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </animated.div>

            <animated.div style={fadeIn} className="card">
                <h3>Pessoas que já pagaram</h3>
                <table className="people-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidPeople.map((person) => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>{person.cpf}</td>
                                <td>{person.address}</td>
                                <td>
                                    <button className="btn-info" onClick={() => handlePersonClick(person)}>
                                        Ver mais
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </animated.div>

            <Modal isOpen={isModalOpen} onClose={closeModal} person={selectedPerson} />
        </div>
    );
};

export default Dashboard;
