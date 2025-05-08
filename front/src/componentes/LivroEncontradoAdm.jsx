import React from 'react'
import { Link } from 'react-router-dom'

const LivroEncontradoAdm = ({livro}) => {
  return (
    <>
      <div className="mt-5">
        <hr/>
        <div className="card card-teste" style={{height:"435px"}}>
          <div className="row ">

            <div className="col-md-3 d-none d-lg-block">
                <div className="">
                    <div className=" d-flex justify-content-center">

                        <img src={livro.capa} className="img-fluid" alt={livro.titulo} style={{height:"433px", borderRadius: "5px"}}  />

                    </div>
                </div>
            </div>
      
      
            <div className="col-md-9">

              <div className="card-body card-body-teste">

                <h4 className="card-title">{livro.titulo}</h4>
                <h5 className="card-subtitle text-body-secondary">{livro.autor}</h5>
                <p className="card-text mt-3 pe-2" style={{maxHeight: "200px", overflow: "auto", textAlign: "justify"}}>
                    <span style={{fontWeight: "bold"}}>Sinopse: </span>
                    {livro.sinopse}
                </p>
                <p className="card-text"><span style={{fontWeight: "bold"}}>Generos: </span> {livro.generos.filter(g => g).join(', ')}</p>
                <div className="d-flex justify-content-end ">

                    <Link to={`/livro-detalhes/${livro._id}`}className="btn btn-warning">Ver detalhes</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LivroEncontradoAdm