import React, {useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../assets/funcoes/authContext.js'

const AdmHeader = () => {

  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/');
    },0);
  };


  return (
    <header>

        <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">

            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu" aria-controls="menu" aria-label="Navegação responsiva">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="menu" aria-labelledby="menuLabel">

                    <div className="offcanvas-header">

                        <h5 className="offcanvas-title" id="menuLabel">Menu</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="fechar"></button>

                    </div>

                    <div className="offcanvas-body justify-content-between">

                        <ul className="navbar-nav">
                            {/* Mapear as opções do menu */}
                            {[
                            { path: "/consulta-usuario", label: "Consulta de usuário" },
                            { path: "/consulta-livro", label: "Consulta de livros" },
                            { path: "/inserir-livro", label: "Inserir livros" },
                            ].map(({ path, label }) => (
                            <li className="nav-item" key={label}>
                                <Link to={path} className={`nav-link ${path === pathname? 'active' : ''}`}>{label}</Link>
                            </li>
                            ))}
                        </ul>

                        <hr/>

                        <div className="">

                          <button onClick={handleLogout} className="btn btn-warning me-2">Sair</button>

                        </div>


                    </div>

                </div>

            </div>

        </nav>

    </header>
  )
}

export default AdmHeader