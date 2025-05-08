import React,{ useState } from 'react'
import AdmHeader from '../componentes/AdmHeader'
import LivroEncontradoAdm from '../componentes/LivroEncontradoAdm'
import useHandleSearch from '../assets/funcoes/useBusca'
import SecaoPesquisa from '../componentes/SecaoPesquisa'



const ConsultaLivroAdm = () => {
  const [livrosEncontrados, setLivrosEncontrados] = useState([])
  const [buscaFeita, setBuscaFeita] = useState(false);
  const { search, setSearch, handleSubmit } = useHandleSearch(setLivrosEncontrados, setBuscaFeita,"http://localhost:3000/livros/busca")

  return (
    <>
      < AdmHeader />
      < SecaoPesquisa
        titulo="Livros"
        placeholder={"Pesquise pelo titulo, autor ou gênero"}
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        resultados={livrosEncontrados}
        buscaFeita={buscaFeita}
        renderItem={(livro) => (
          <LivroEncontradoAdm key={livro._id} livro={livro} />
        )}
       />
    </>
  )
}

export default ConsultaLivroAdm