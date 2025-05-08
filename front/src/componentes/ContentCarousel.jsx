import React, {useContext}from 'react'
import { AuthContext } from '../assets/funcoes/authContext.js';
import { Link } from 'react-router-dom';


const ContentCarousel = ({ livro }) => {
  const { usuario } = useContext(AuthContext);
  const path = usuario ? `/alugar-livro/${livro._id}` : '/login'
    return (
      <div className="cardLivro">
        <div className="capaLivro">
          <img src={livro.capa} className="img-capa" />
        </div>
        <div className="detalhesLivro">
          <h2 className='carrossel-titulo'>{livro.titulo}</h2>
          <h3 className='carrossel-autor'>{livro.autor}</h3>
          <p className="descricaoLivro">
            <span className='carrossel-sinopse'> Sinopse: </span> 
            {livro.sinopse}</p>
          <p className="generosLivro">
            <strong>Gêneros:</strong> {livro.generos.filter(g => g).join(', ')}
          </p>
          <div className='carrossel-estoque-botao'>
          <p className="estoqueLivro">Ainda restam <strong>{livro.exemplares}</strong> livros para alugar</p>
          <Link to={path} className="botaoAlugar" style={{textDecoration:"none"}}>Alugar</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContentCarousel;