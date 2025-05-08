import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../assets/funcoes/authContext.js"

const RotaProtegida = ({ children, role }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (role && usuario.credencial !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RotaProtegida;
