import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../assets/funcoes/authContext.js'; 

const HistoricoUsuario = () => {
  const { usuario } = useContext(AuthContext); 
  const [emprestimos, setEmprestimos] = useState([]);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/emprestimoUser/${usuario._id}`);
        setEmprestimos(resposta.data);
        console.log(resposta.data)
      } catch (erro) {
        console.error("Erro ao buscar histórico de empréstimos:", erro);
      }
    };

    if (usuario?._id) {
      buscarHistorico();
    }
  }, [usuario]);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const calcularStatus = (emprestimo) => {
    if (emprestimo.dataDevolucao) return "Devolvido";
    const hoje = new Date();
    const prevista = new Date(emprestimo.dataPrevistaDevolucao);
    return hoje > prevista ? "Atrasado" : "Em dia";
  };

  const diasAtraso = (emprestimo) => {
    if (emprestimo.dataDevolucao) return 0;
    const hoje = new Date();
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    const diff = hoje - prevista;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  return (
    <div className="table-responsive" style={{ overflow: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do livro</th>
            <th>Data do empréstimo</th>
            <th>Data prevista</th>
            <th>Data de devolução</th>
            <th>Status</th>
            <th>Dias de atraso</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.livro?.titulo || 'Título não disponível'}</td>
              <td>{formatarData(emp.dataEmprestimo)}</td>
              <td>{formatarData(emp.dataDevolucaoPrevista)}</td>
              <td>{emp.dataDevolucao ? formatarData(emp.dataDevolucao) : "-"}</td>
              <td>{calcularStatus(emp)}</td>
              <td>{diasAtraso(emp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricoUsuario;
