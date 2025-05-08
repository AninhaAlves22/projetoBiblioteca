import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../assets/funcoes/context.js';
import AdmHeader from '../componentes/AdmHeader'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BotaoVoltar from '../componentes/BotaoVoltar.jsx';
import Spinner from '../componentes/Spinner.jsx';

const LivroDetalhes = () => {
  const { id } = useParams();
  const { livros } = useContext(Context);
  const [emprestimos, setEmprestimos] = useState([]);



  const bookObj = livros?.find((currBook) => currBook._id === id);

  useEffect(() => {
    const fetchEmprestimos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/emprestimoLivro/${id}`);
        setEmprestimos(response.data);
      } catch (erro) {
        console.error("Erro ao buscar empréstimos do livro:", erro);
      }
    };
  if (bookObj) {
        fetchEmprestimos();
      }
    }, [id, bookObj]);

  const calcularStatus = (emprestimo) => {
    if (emprestimo.dataDevolucao) return "Devolvido";
    const hoje = new Date();
    const prevista = new Date(emprestimo.dataPrevistaDevolucao);
    return hoje > prevista ? "Atrasado" : "Em dia";
  };

  if (!bookObj) return < Spinner />;
    
  
  return (
    <>
    <div>
      < AdmHeader />

      <section  className="bg-secondary" style={{border: "solid transparent 1px"}}   >
        <BotaoVoltar />
        <div className="container ">
          <div className="card bg-dark text-light">
            <div className="card-body">

              <div className="mt-5 bg-white pt-2 shadow text-dark">
                <div className="row d-flex justify-content-center align-self-center">
                  <div className="col-3 book-img">
                      <img src={bookObj.capa} className="img-fluid shadow rounded" alt="" />
                  </div>
                </div>
                      
                <div className="d-flex justify-content-center align-self-center">
                  <h1 className="display-3">{bookObj.titulo}</h1>
                </div>
                      
                <div className="mt-4">

                    <div className=" ps-2 pt-2 pe-2 pb-2">

                      <div className="row">

                        <div className="col-md-4">

                          <p><span style={{fontWeight:"bold"}}>Nome do autor: </span>{bookObj.autor}</p>
                          <p><span style={{fontWeight:"bold"}}>Editora: </span>{bookObj.editora}</p>
                          <p><span style={{fontWeight:"bold"}}>Ano de publicação: </span>{bookObj.anoPublicacao}</p>
                          <p><span style={{fontWeight:"bold"}}>Páginas: </span>{bookObj.paginas}</p>
                          <p><span style={{fontWeight:"bold"}}>Idioma: </span>PT-BR</p>
                          <p><span style={{fontWeight:"bold"}}>Gênero: </span>{bookObj.generos.filter(g => g).join(', ')}</p>
                         

                        </div>

                        <div className="col-md-8">

                          <p style={{textAlign: "justify"}}><span style={{fontWeight:"bold"}}>Sinopse: </span>
                            {bookObj.sinopse}                       
                          </p>

                          <div className="d-flex justify-content-end mt-4">

                            <p className="text-body-secondary">Ainda temos um estoque de <span style={{fontWeight:"bold"}}>{bookObj.exemplares}</span> livros</p>
                              
                          </div>

                        </div>

                        <div className="col-12 p-3 mt-5">
                          <h5>Lista de usuarios que fizeram emprestimo desse livro</h5>
                          <table className="table table-striped table-light mt-4">
                            <thead>
                              <tr>
                                <th>id usuario</th>
                                <th>Data emprestimo</th>
                                <th>Data marcada</th>
                                <th>Data devolucão</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                              <tbody>
                                {emprestimos.map((emp) => (
                                  <tr key={emp._id}>
                                    <td>{emp.usuario?._id}</td>
                                    <td>{new Date(emp.dataEmprestimo).toLocaleDateString()}</td>
                                    <td>{new Date(emp.dataDevolucaoPrevista).toLocaleDateString()}</td>
                                    <td>{emp.dataDevolucao ? new Date(emp.dataDevolucao).toLocaleDateString() : '---'}</td>
                                    <td>{calcularStatus(emp)}</td>
                                  </tr>
                                ))}
                              </tbody>    
                            
                          </table>
                        </div>

                      </div>

                    </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default LivroDetalhes