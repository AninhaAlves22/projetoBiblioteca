import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LinkBook from "../componentes/LinkBook";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Spinner from "../componentes/Spinner";

const ResultadoBusca = () => {
  const [ searchParams ] = useSearchParams();
  const termoBusca = searchParams.get("q") || "";
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarLivros = async () => {
      if (!termoBusca.trim()) {
        setErro("Nenhum termo de busca fornecido.");
        return;
      }

      setIsLoading(true); 

      try {
        const resposta = await fetch(`http://localhost:3000/livros/busca?q=${encodeURIComponent(termoBusca)}`);
        if (!resposta.ok) {
          throw new Error("Erro ao buscar livros");
        }
        const dados = await resposta.json();
        setLivros(dados);
        setErro("");
      } catch {
        setErro("Erro ao buscar livros ou nenhum encontrado.");
        setLivros([]);
      }finally {
        setIsLoading(false); 
      }
    };

    buscarLivros();
  }, [termoBusca]);

  return (
    <div className="page-wrapper">
      < Header />

      <main className="container mt-4">
        
        <section style={{marginTop: "5rem"}}>
              <div className="container-fluid">
                  <button onClick={()=>navigate(-1)} className="btn btn-dark" style={{textDecoration: "none"}}>
                      <i className="fa-solid fa-arrow-left"></i>
                  </button>
              </div>
        </section> 

        <h2 className="resultado-busca__h2">Resultados para : "{termoBusca}"</h2>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{height: "200px"}}>
            < Spinner />
          </div>
        ) : erro ? (
          <div className="alert alert-danger">{erro}</div>
        ) : livros.length > 0 ? (
          <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-2">
            {livros.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((currLivro, index) => (
              <LinkBook {...currLivro} key={index} />
            ))}
          </div>
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </main>

      < Footer />
    </div>
  )
}

export default ResultadoBusca