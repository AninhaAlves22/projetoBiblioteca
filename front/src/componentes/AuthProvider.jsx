import React, { useState, useEffect } from 'react';
import { AuthContext } from '../assets/funcoes/authContext.js';

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  if (carregando) return <p>Carregando autenticação...</p>; 

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

