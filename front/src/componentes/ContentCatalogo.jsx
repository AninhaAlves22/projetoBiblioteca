import React, { useState, useContext, useEffect } from 'react';
import LinkBook from './LinkBook';
import { Context } from '../assets/funcoes/context.js';
import { Link } from 'react-router-dom';
import useHandleSearch from '../assets/funcoes/useBusca.js';  
import axios from 'axios'; 

const ContentCatalogo = () => {
    const [loading, setLoading] = useState(true);
    const { livros, setLivros } = useContext(Context);
    const arrayLivros = livros;
    const [paginaAtual, setPaginaAtual] = useState(1);
    const livrosPorPagina = 20;

    const { search, setSearch, handleSubmit } = useHandleSearch(
      (resultados) => setLivros(resultados),
      null,
      "http://localhost:3000/livros/busca"
    );

    const indiceUltimoLivro = paginaAtual * livrosPorPagina;
    const indicePrimeiroLivro = indiceUltimoLivro - livrosPorPagina;
    const livrosVisiveis = arrayLivros.slice(indicePrimeiroLivro, indiceUltimoLivro);
    const totalPaginas = Math.ceil(arrayLivros.length / livrosPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    
    useEffect(() => {
      const buscarTodosLivros = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:3000/livros");
          setLivros(response.data);
        } catch (error) {
          console.error("Erro ao buscar todos os livros:", error);
        } finally {
          setLoading(false); 
        }
      };

      if (search.trim() === "") {
        buscarTodosLivros();
      }
    }, [search, setLivros]); 

    return (
    <>
        <main>
            <section>
                <div className="container">

                    <div className="d-flex align-self-center justify-content-center">
                        <h2 className="display-3" style={{marginTop: "120px"}}>
                            <span className="text-warning">Explore</span> nosso catálogo
                        </h2>
                    </div>

                    <div className="row d-flex align-self-center justify-content-center mt-4">
                        
                        <div className="col-8">
                            <form onSubmit={handleSubmit} className="d-flex"> 
                                <input 
                                    type="search" 
                                    className="form-control" 
                                    placeholder="Pesquise por título, gênero ou autor" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn btn-dark" type="submit">Pesquise</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="mt-5" />

            <section>
                <div className="container">
                    <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-2">
                    {loading ? (
                      <div className="col-12 d-flex justify-content-center mt-5">
                        <div className="spinner-border text-warning" role="status">
                          <span className="visually-hidden">Carregando...</span>
                        </div>
                      </div>
                    ) : livrosVisiveis.length === 0 ? (
                      <div className="col-12 d-flex justify-content-center mt-5">
                        <h4 className="text-muted">Nenhum livro encontrado</h4>
                      </div>
                    ) : (
                      livrosVisiveis
                        .sort((a, b) => a.titulo.localeCompare(b.titulo))
                        .map((currLivro, index) => (
                          <LinkBook {...currLivro} key={index} />
                        ))
                    )}
                    </div>

                    {livrosVisiveis.length > 0 && (
                      <nav aria-label="paginação" className="mt-5">
                          <ul className="pagination justify-content-end">
                              <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                                  <Link to="#" className="page-link" onClick={paginaAnterior}>Anterior</Link>
                              </li>

                              {[...Array(totalPaginas)].map((_, index) => (
                                  <li className={`page-item ${paginaAtual === index + 1 ? 'active' : ''}`} key={index}>
                                      <Link to="#" className="page-link" onClick={() => setPaginaAtual(index + 1)}>
                                          {index + 1}
                                      </Link>
                                  </li>
                              ))}

                              <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                                  <Link to="#" className="page-link" onClick={proximaPagina}>Próximo</Link>
                              </li>
                          </ul>
                      </nav>
                     )}
                </div>
            </section>
        </main>
    </>
    );
}

export default ContentCatalogo;
