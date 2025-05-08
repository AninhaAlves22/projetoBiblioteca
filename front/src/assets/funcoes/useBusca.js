import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useHandleSearch = (onResult, onSearchFinished, searchUrl) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const termo = search.trim();
    if (!termo) return;

    if (onResult) {
      // Busca no backend e retorna o resultado pra função de callback
      try {
        const response = await axios.get(`${searchUrl}?q=${encodeURIComponent(termo)}`);
        console.log("Resultado da busca:", response.data); // Verifica o que veio da busca
        onResult(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        onResult([]); // Retorna vazio em caso de erro
      }finally {
        if (onSearchFinished) onSearchFinished(true); }
    } else {
      // Busca padrão com navegação
      navigate(`/resultados?q=${encodeURIComponent(termo)}`);
    }
  };

  return { search, setSearch, handleSubmit };
};

export default useHandleSearch;
