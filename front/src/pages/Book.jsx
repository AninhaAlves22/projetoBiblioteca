import React, {useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../assets/funcoes/authContext';
import { Context } from '../assets/funcoes/context.js';
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import BotaoVoltar from '../componentes/BotaoVoltar.jsx';
import Spinner from '../componentes/Spinner.jsx';

const Book = () => {
  const { id } = useParams();
  const { livros } = useContext(Context);
  const { usuario } = useContext(AuthContext);

  if (!livros || livros.length === 0) {
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

  const bookObj = livros.find(livro => livro._id === id);

  if (!bookObj) {
    return (
      <>
        <Header />
        <main className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <p>Livro não encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  const path = usuario ? `/alugar-livro/${bookObj._id}` : '/login'

  return (
    <div className='page-wrapper'>
      < Header />
      <main>
   
          <BotaoVoltar />
  
          <section className="mt-4">
              <div className="container">
  
                  <div className="row d-flex justify-content-center align-self-center">
  
                      <div className="col-3 book-img">
                          <img src={bookObj.capa} className="img-fluid shadow rounded" alt="" />
                      </div>
                  
                  </div>
  
                  <div className="d-flex justify-content-center align-self-center">
  
                      <h1 className="display-3">{bookObj.titulo}</h1>
  
                  </div>
  
                  <div className="mt-4">
  
                      <div className="card shadow ps-2 pt-2 pe-2 pb-2">
  
                          <div className="row">
  
                              <div className="col-md-4">
  
                                  <p className='content-book__p'><span>Nome do autor: </span>{bookObj.autor}</p>
                                  <p className='content-book__p'><span>Editora: </span>{bookObj.editora}</p>
                                  <p className='content-book__p'><span>Ano de publicação: </span>{bookObj.anoPublicacao}</p>
                                  <p className='content-book__p'><span>Páginas: </span>{bookObj.paginas}</p>
                                  <p className='content-book__p'><span>Idioma: </span>PT-BR</p>
                                  <p className='content-book__p'><span>Gênero: </span>{bookObj.generos.filter(g => g).join(', ')}</p>
                                 
  
                              </div>
  
                              <div className="col-md-8">
  
                                  <p style={{textAlign: "justify"}}><span style={{fontWeight: "bold"}}>Sinopse: </span>
                                      {bookObj.sinopse}                         
                                  </p>
  
                                  <div className="d-flex justify-content-between mt-4">
  
                                      <p className="text-body-secondary">Ainda temos um estoque de <span style={{fontWeight: "bold"}}>{bookObj.exemplares}</span> livros</p>
                                      <Link to={path} className="btn-warning btn" >Alugar</Link>
                                  </div>
  
  
                              </div>
  
                          </div>
  
                      </div>
  
                  </div>
              </div>
          </section>
      </main>
      < Footer />
    </div>
  )
}

export default Book