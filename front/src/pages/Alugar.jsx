import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../assets/funcoes/context';
import { AuthContext } from '../assets/funcoes/authContext';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import BotaoVoltar from '../componentes/BotaoVoltar';
import Spinner from '../componentes/Spinner';

const Alugar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const { livros, atualizarLivros } = useContext(Context);

  const idUsuario = usuario?._id;
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  useEffect(() => {
    if (livros.length > 0) {
      const livro = livros.find(livro => livro._id === id);
      setLivroSelecionado(livro);
    }
  }, [livros, id]);

  const handleEntrarNaListaEspera = async () => {
    const dados = {
      usuarioId: idUsuario,
      livroId: id
    };

    try {
      const resposta = await fetch("http://localhost:3000/lista-espera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const json = await resposta.json();

      if (resposta.ok) {
        alert(json.mensagem || "Você foi adicionado à lista de espera com sucesso!");
        navigate(-1);
      } else {
        if (resposta.status === 400 && json.mensagem?.includes("já está na lista")) {
          alert("Você já está na lista de espera para este livro.");
        } else {
          alert(json.mensagem || "Erro ao entrar na lista de espera.");
        }
      }
    } catch (error) {
      console.error("Erro ao entrar na lista de espera:", error);
      alert("Erro ao entrar na lista de espera.");
    }
  };

  const handleConfirmarAluguel = async () => {
    const emprestimo = { livroId: id, usuarioId: idUsuario };
    try {
      const resposta = await fetch("http://localhost:3000/emprestimos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emprestimo)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        await atualizarLivros();
        alert(`Você alugou o livro "${livroSelecionado.titulo}"!`);
        navigate('/');
      } else {
        if (resposta.status === 400 && dados.message?.includes("já possui um empréstimo")) {
          alert("Você já possui um empréstimo ativo deste livro.");
        } else {
          alert(dados.message || "Erro ao realizar aluguel.");
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao tentar alugar o livro.");
    }
  };

  if (!usuario || livros.length === 0 || !livroSelecionado) {
    return (
      <>
        <Header />
        <main className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          < Spinner />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div  className='page-wrapper'>
      <Header />
      <main>
        <BotaoVoltar />
        <h1 className='aluguel__h1' >Confirmação</h1>
        <div className='aluguel-div__content'>
          <section className='aluguel-section__livro'>
            <div className="aluguel-div__img">
              <img className="img-fluid shadow rounded" src={livroSelecionado.capa} alt="Capa do livro" />
            </div>

            <div className='aluguel-div__detalhes'>
              <h3>{livroSelecionado.titulo}</h3>
              <h4>Autor: {livroSelecionado.autor}</h4>
              <p><strong>Gêneros:</strong> {livroSelecionado.generos.filter(g => g).join(', ')}</p>
              <p className="sinopse-scroll"><strong>Sinopse:</strong> {livroSelecionado.sinopse}</p>
              <p><strong>Exemplares disponíveis:</strong> {livroSelecionado.exemplares}</p>
            </div>

            <div className='aluguel-dados__confirmacao'>
              <p>Nome do usuário: {usuario.nome}</p>
              <p>Id: {usuario._id}</p>
              {livroSelecionado.exemplares > 0 ? (
                <>
                  <p>Data do empréstimo: {new Date().toLocaleDateString('pt-BR')}</p>
                  <p><strong>Data devolução: {new Date(new Date().setDate(new Date().getDate() + 15)).toLocaleDateString('pt-BR')}</strong></p>
                  <button className="btn btn-warning" style={{ marginRight: '3px' }} onClick={handleConfirmarAluguel}>Confirmar Aluguel</button>
                  <button className="btn btn-secondary botaoCanelar" onClick={() => navigate(-1)}>Cancelar</button>
                </>
              ) : (
                <>
                  <p className="text-danger mt-3">
                    Este livro não está disponível no momento. Cadastre-se na lista de espera para ser notificado quando houver disponibilidade.
                  </p>
                  <button className="btn btn-warning" style={{ marginRight: '3px' }} onClick={handleEntrarNaListaEspera}>Entrar na Lista de Espera</button>
                  <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Alugar;
