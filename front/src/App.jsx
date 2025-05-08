import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/catalogo'
import Book from './pages/Book'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Adm from './pages/Adm'
import InserirLivro from './pages/InserirLivro'
import ResultadoBusca from './pages/ResultadoBusca'
import { AuthProvider } from './componentes/AuthProvider'
import { LivrosProvider } from './assets/funcoes/livroContext.jsx'
import ConsultaLivroAdm from './pages/ConsultaLivroAdm'
import LivroDetalhes from './pages/LivroDetalhes'
import ConsultaUsuarioAdm from './pages/ConsultaUsuarioAdm'
import PerfilUsuario from './pages/PerfilUsuario'
import Alugar from './pages/Alugar'
import ScrollToTop from './componentes/ScrollToTop.jsx'
import RotaProtegida from './componentes/RotaProtegida.jsx'


const App = () => {
  return (
    <AuthProvider>
      <LivrosProvider>
        <BrowserRouter>
          < ScrollToTop />
          <Routes>
            < Route path='/' element= {< Home />}/>
            < Route path='/catalogo' element= {< Catalogo />}/>
            < Route path='/livro/:id' element= {< Book />}/>
            < Route path='/login' element= {< Login />}/>
            < Route path='/cadastro' element= {< Cadastro />}/>
            < Route path='/menu-adm' element= {<RotaProtegida role="admin"> < Adm /> </RotaProtegida>}/>
            < Route path='/inserir-livro' element= {<RotaProtegida role="admin">< InserirLivro /></RotaProtegida>}/>
            <Route path="/resultados" element={<ResultadoBusca />} />
            <Route path="/consulta-livro" element={<RotaProtegida role="admin">< ConsultaLivroAdm /></RotaProtegida>} />
            <Route path="/consulta-usuario" element={<RotaProtegida role="admin">< ConsultaUsuarioAdm /></RotaProtegida>} />
            <Route path="/livro-detalhes/:id" element={< LivroDetalhes />} />
            <Route path="/perfil_usuario" element={< PerfilUsuario   />} />
            <Route path="/alugar-livro/:id" element={< Alugar />} />
          </Routes>
        </BrowserRouter>
      </LivrosProvider>
    </AuthProvider>
  )
}

export default App