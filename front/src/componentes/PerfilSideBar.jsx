import React,{useContext}  from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { AuthContext } from '../assets/funcoes/authContext.js'
import foto from '../assets/img/exemplo_perfil.jpg'


const PerfilSideBar = ({  abaAtiva, nome, email}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (novaAba) => {
    navigate(`/perfil_usuario?aba=${novaAba}`); 
  };
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div style={{width: "300px", height: "300px"}}>
          <div style={{borderRadius: "50%", width: "100%", height: "100px", margin: "3px solid black", overflow: "hidden", position: "relative", paddingTop: "100%", backgroundColor: "aqua"}}>
            <img src={foto} alt="" className=" " style={{objectFit: "cover", width: "100%", height: "100%", position:"absolute", top: "0", left: "0"}}/>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-center mt-2">
        <h4 className="display-6 text-black">{nome}</h4>
      </div>

      <div className="d-flex justify-content-center">
        <h6 className="text-dark " style={{marginTop: "-10px"}}>{email}</h6>
      </div>
          
      <ul style={{listStyle: "none"}} className="d-none d-lg-block mt-4">
        <li>
        <Link to="/perfil_usuario?aba=perfil" style={{ textDecoration: "none", fontSize: "23px", background: "none", border: "none" }} className="link-dark icon-link">
            <i className="fa-solid fa-address-card fa-lg"></i>
            Perfil
          </Link>
        </li>

        <li className="mt-2">
          <Link to="/perfil_usuario?aba=historico" style={{ textDecoration: "none", fontSize: "23px", background: "none", border: "none" }} className="link-dark">
            <i className="fa-regular fa-rectangle-list fa-lg"></i>
            Histórico
          </Link>
        </li>

        <li className="mt-2">
          <Link to="/perfil_usuario?aba=pagamentos"  style={{ textDecoration: "none", fontSize: "23px", background: "none", border: "none" }} className="link-dark">
            <i className="fa-regular fa-credit-card fa-lg"></i>
            Pagamentos
          </Link>
        </li>

        <li className="mt-2">
          <button onClick={handleLogout} className="link-dark fonte_opcoes_perfil sidebar__button-sair">           
            <i className="fa-solid fa-door-open fa-lg"></i>
            Logout
          </button>
        </li>

      </ul>

      <div className="d-flex justify-content-center mb-3">
        <div className="d-lg-none mt-4 btn-group" role="group">
          <input type="radio" className="btn-check" id="perfil" name="menu_perfil"
            autoComplete="off" defaultChecked={abaAtiva === 'perfil'} onChange={() => handleClick('perfil')} />
          <label className="btn btn-dark" htmlFor="perfil">Perfil</label>

          <input type="radio" className="btn-check" id="historico" name="menu_perfil"
            autoComplete="off" defaultChecked={abaAtiva === 'historico'} onChange={() => handleClick('historico')} />
          <label className="btn btn-dark" htmlFor="historico">Histórico</label>

          <input type="radio" className="btn-check" id="pagamentos" name="menu_perfil"
            autoComplete="off" defaultChecked={abaAtiva === 'pagamentos'} onChange={() => handleClick('pagamentos')} />
          <label className="btn btn-dark" htmlFor="pagamentos">Pagamentos</label>
        </div>
      </div>
</>
  )
}

export default PerfilSideBar