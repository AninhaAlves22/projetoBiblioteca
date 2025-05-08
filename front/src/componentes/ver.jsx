import React, {useContext} from 'react'
import { AuthContext } from '../assets/funcoes/authContext.js'
import { Link, useNavigate} from 'react-router-dom'

const UserLogado = () => {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <div className="btn-group dropstart">

      <button className="btn btn-dark me-2 dropdown-toggle" data-bs-toggle="dropdown" type="button">
        <i className="fa-solid fa-circle-user fa-2xl" style={{color: "#FFD43B"}}></i>
      </button>

      <ul className="dropdown-menu dropdown-menu-dark">
        <li >
          <Link to="/perfil_usuario?aba=perfil" className="dropdown-item">Perfil</Link>
        </li>
        <li >
          <Link to="/perfil_usuario?aba=historico" className="dropdown-item">Histórico</Link>
        </li>
        <li >
          <Link to="/perfil_usuario?aba=pagamentos" className="dropdown-item">Pagamentos</Link>
        </li>
        <li >
        <button onClick={handleLogout} className="dropdown-item">Sair</button>
        </li>
      </ul>

    </div>

  )
}

export default UserLogado