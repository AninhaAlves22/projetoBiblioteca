import React,{ useState } from 'react'
import AdmHeader from '../componentes/AdmHeader'
import useHandleSearch from '../assets/funcoes/useBusca'
import SecaoPesquisa from '../componentes/SecaoPesquisa'
import UsuarioEncontrado from '../componentes/UsuarioEncontrado'

const ConsultaUsuarioAdm = () => {
  const [usuariosEncontrados, setUsuariosEncontrados] = useState([])
  const [buscaFeita, setBuscaFeita] = useState(false);
  const { search, setSearch, handleSubmit } = useHandleSearch(setUsuariosEncontrados, setBuscaFeita,"http://localhost:3000/usuario/busca")

  return (
    <>
      < AdmHeader />
      < SecaoPesquisa
         titulo="Usuário"
         placeholder={"Pesquise pelo nome, email ou id"}
         search={search}
         setSearch={setSearch}
         handleSubmit={handleSubmit}
         resultados={usuariosEncontrados}
         buscaFeita={buscaFeita}
         renderItem={(usuario) => (
           <UsuarioEncontrado key={usuario._id} usuario={usuario} />
         )}
      />
    </>
  )
}

export default ConsultaUsuarioAdm