import React , {useContext} from 'react'
import { AuthContext } from '../assets/funcoes/authContext.js';
import SearchForm from './SearchForm'
import { Link, useLocation } from 'react-router-dom'
import UserLogado from './UserLogado';

const Header = () => {

    const { pathname } = useLocation();
    const isHome = pathname === "/"
    const isCatalogo = pathname === "/catalogo";
    let path = isCatalogo ? "#" : "/catalogo";

    const { usuario } = useContext(AuthContext);
    
    
  return (
    <>
        <header>

            <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg ">

                <div className="container-fluid">
                 
                    <Link to="#"  className="navbar-brand container_ancora">SUA BIBLIOTECA</Link>

                    {/* responsividade */}
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
                                <li className="nav-item">
                                    <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Página Inicial</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={path} className={`nav-link ${isCatalogo ? 'active' : ''}`}>Catálogo de livros</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="#" className="nav-link">Sobre nós</Link>
                                </li>
                            </ul>

                            < hr />

                            {/* formulário */}
                            {isCatalogo ? (<></>)  : (< SearchForm />)}

           

                             {usuario ? < UserLogado /> : <div>
                                <Link to="/login" className="btn btn-warning me-2 " type="button">Entre</Link>
                                ou
                                <Link to="/cadastro" className="btn btn-warning me-2 ms-2 " type="button">Inscreva-se</Link>
                            </div> }   
                           
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header