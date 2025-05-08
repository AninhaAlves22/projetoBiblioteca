import React from 'react'
import { Link } from 'react-router-dom';
import LoginForm from '../componentes/LoginForm'

const LoginArea = ({titulo, mensagem, option, comando, path}) => {
  return (
    <section
      className="w-100 bg-warning d-flex align-items-center"
      style={{ "--bs-bg-opacity": 0.5, minHeight: "100vh" }}
    >
      <div className="container">
        <div className="d-flex justify-content-center">
          <h1 className="display-3 mb-5">{`Seja bem-vindo(a) ${mensagem}!`}</h1>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">{titulo}</h5>

                < LoginForm
                    titulo = {titulo}
                 />

                <div className="mt-2">
                  <small className="text-body-secondary">
                    {option}
                    <Link to={path} className="ms-1" style={{ textDecoration: "none" }}>
                      {comando}
                    </Link>
                    !
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <p>
            <Link to="/">Voltar para home</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginArea