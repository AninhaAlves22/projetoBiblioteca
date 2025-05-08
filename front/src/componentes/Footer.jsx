import React from 'react'
import { Link, useLocation} from 'react-router-dom'

const Footer = () => {
  const { pathname } = useLocation();
  const isCatalogo = pathname === "/catalogo";
  let path = isCatalogo ? "#" : "/catalogo";

  return (
    <>
        <footer className="mt-4 bg-dark">
            <div className="container container-footer">

                <div className="row d-flex justify-content-between align-items-center" style={{paddingTop:"1rem"}}>

                    <div className="col-8">
                            <ul className="d-flex flex-row ul-footer">
                                <li className="mx-2">
                                    <Link to="/" className="link-warning link-footer" >Página inicial</Link>
                                </li>
                                <li className="mx-2" >
                                    <Link to={path} className="link-warning link-footer " >Catalógo</Link>
                                </li>
                                <li className="mx-2" >
                                    <Link to="#" className="link-warning link-footer" >Sobre nós</Link>
                                </li>
                            </ul>
                    </div>

                    <div className="col-4 d-flex justify-content-end">
                        <p className="text-white">&#169; 2025 - Todos os direiros reservados</p>
                    </div>

                </div>

            </div>
        </footer>
    </>
  )
}

export default Footer