import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../assets/funcoes/authContext.js'
import { useLocation } from 'react-router-dom'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import PerfilSideBar from '../componentes/PerfilSideBar'
import InformacoesUsuario from '../componentes/InformacoesUsuario'
import HistoricoUsuario from '../componentes/HistoricoUsuario'
import PagamentosUsuario from '../componentes/PagamentosUsuario'

const PerfilUsuario = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const abaInicial = queryParams.get('aba') || 'perfil';
  const [abaAtiva, setAbaAtiva] = useState(abaInicial);

  const { usuario } = useContext(AuthContext);
  const [dadosCompletosUsuario, setDadosCompletosUsuario] = useState(null);


  useEffect(() => {
    const novaAba = new URLSearchParams(location.search).get('aba');
    if (novaAba && novaAba !== abaAtiva) {
      setAbaAtiva(novaAba);
    }
  }, [location, abaAtiva]);
  
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/usuario/${usuario._id}`);
        const dadosUsuario = await resposta.json();
        setDadosCompletosUsuario(dadosUsuario);
      } catch (erro) {
        console.error("Erro ao buscar dados do usuário", erro);
      }
    };
  
    if (usuario?._id) {
      buscarDados();
    }
  }, [usuario]);

  if (!dadosCompletosUsuario) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <span>Carregando informações do usuário...</span>
      </div>
    );
  }

  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case 'perfil':
        return <InformacoesUsuario {...dadosCompletosUsuario} />
      case 'historico':
        return < HistoricoUsuario {...dadosCompletosUsuario}/>
      case 'pagamentos':
        return < PagamentosUsuario {...dadosCompletosUsuario} />
      default:
        return null
      }
  };
  
  return (
    <>
      <div className='page-wrapper'>
      < Header />
      <main>
      <section className="" style={{marginTop: "70px"}}>
        <div className="container rounded shadow bg-warning">
          <div className="row">
            <div className="col-lg-4  rounded">

              < PerfilSideBar  trocarAba={setAbaAtiva} abaAtiva={abaAtiva} {...(dadosCompletosUsuario || {})}/>

            </div>

            <div className="col-lg-8 pagina-perfil__fonte" >
              <p className="fs-6 text-body-secondary fw-light ">id de usuário: {usuario._id}</p>
              
              {renderizarConteudo()}

              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-dark" type="button">Alterar dados</button>
              </div>
                
            </div>
          </div>
        </div>
      </section>
 
      </main>
      < Footer />
      </div>
    </>
  )
}

export default PerfilUsuario