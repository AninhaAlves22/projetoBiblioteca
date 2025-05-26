import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuarioEncontrado = ({usuario}) => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchEmprestimos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/emprestimoUser/${usuario._id}`);
        setEmprestimos(response.data);
      } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchEmprestimos();
  }, [usuario._id]);

  const calcularStatus = (emprestimo) => {
    if (emprestimo.dataDevolucao) return "Devolvido";
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    prevista.setHours(0, 0, 0, 0);
    return hoje > prevista ? "Atrasado" : "Em dia";
  };

  const diasAtraso = (emprestimo) => {
    if (emprestimo.dataDevolucao) return 0;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    prevista.setHours(0, 0, 0, 0);
    const diff = hoje - prevista;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  return (
    <div className="mt-5">
      <hr/>
      <div className="border bg-light text-dark mt-5 rounded shadow">
        <div className="row p-2">

          <h4>Informações do Usuario</h4>

          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">Nome:</span> {usuario.nome}
          </div>
          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">E-mail:</span> {usuario.email}
          </div>
          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">Data de Nascimento:</span> {new Date(usuario.dataNasc).toLocaleDateString()}
          </div>
          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">Data de Registro:</span> {new Date(usuario.dataCadastro).toLocaleDateString()}
          </div>
          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">Cel:</span> {usuario.celular}
          </div>
          <div className="col-lg-4 fs-5 mt-4">
            <span className="fw-bold ">Situação:</span> Regular
          </div>

          <h4 className="mt-5">Historico de emprestimos</h4>
          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <div className="table-responsive mt-3">
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th>Título do livro</th>
                    <th>Data do empréstimo</th>
                    <th>Data marcada</th>
                    <th>Data de devolução</th>
                    <th>Status</th>
                    <th>Dias de atraso</th>
                  </tr>
                </thead>
                <tbody>
                  {emprestimos.length > 0 ? (
                      emprestimos.map((emp, index) => {
                        const dataEmprestimo = new Date(emp.dataEmprestimo).toLocaleDateString();
                        const dataMarcada = new Date(emp.dataDevolucaoPrevista).toLocaleDateString();
                        const dataDevolucao = emp.dataDevolucao
                          ? new Date(emp.dataDevolucao).toLocaleDateString()
                          : '—';
                          
                        return (
                          <tr key={index}>
                            <td>{emp.livro?.titulo || '—'}</td>
                            <td>{dataEmprestimo}</td>
                            <td>{dataMarcada}</td>
                            <td>{dataDevolucao}</td>
                            <td>{calcularStatus(emp)}</td>
                            <td>{diasAtraso(emp)}</td>
                          </tr>
                        );
                      })
                    ): (
                      <tr>
                        <td colSpan="6" className="text-center">Nenhum empréstimo encontrado</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          )}

          <h4 className="mt-5">Historico de pagamentos</h4>
          <div className="table-responsive mt-3">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th>Codigo do pagamento</th>
                  <th>Valor</th>
                  <th>Dia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
                <tr>
                  <td>00000000</td>
                  <td>Livro 1</td>
                  <td>11/04/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UsuarioEncontrado