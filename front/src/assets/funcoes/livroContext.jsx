import React, { useState, useEffect } from "react";
import { Context } from "./context.js";

export const LivrosProvider = ({ children }) => {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  
  const buscarLivros = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/livros");
      const dados = await resposta.json();
      setLivros(dados);
      setCarregando(false);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  return (
    <Context.Provider value={{ livros, setLivros, carregando, atualizarLivros: buscarLivros }}>
      {children}
    </Context.Provider>
  );
};
