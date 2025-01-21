// src/components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

// PrivateRoute agora usa a prop element corretamente
const PrivateRoute = ({ element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={auth.currentUser ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
