import React from 'react'
import AdmHeader from '../componentes/AdmHeader'
import { Link } from 'react-router-dom'

const Adm = () => {
  return (
    <div className='bg-secondary' style={{height: "100vh", border: "transparent solid 1px"}}>
      < AdmHeader />
      <section className="w-100" style={{marginTop: "10rem"}}>

        <div className="container">

          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 justify-content-md-center">

            <div className="col">

              <div className="card bg-dark">
                <div className="card-body">

                  <div className="d-grid">

                    <Link to="/consulta-usuario" type="button" className="btn btn-warning mt-4 mb-4">Consultar dados de usuário</Link>
                    <Link to="/consulta-livro" type="button" className="btn btn-warning mb-4">Consultar dados de livros</Link>
                    <Link to="/inserir-livro" type="button" className="btn btn-warning mb-4">Inserir livros/dados</Link>

                  </div>
    
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>
    </div>
  )
}

export default Adm