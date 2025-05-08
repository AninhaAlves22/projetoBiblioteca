import React from 'react'
import { Link } from 'react-router-dom'


const LinkBook = ({titulo, autor, capa, _id}) => {
  return (
    <>
        <div className="col">
            <Link to={`/livro/${_id}`} style={{textDecoration: "none"}}>

                <div className="card">

                    <img src={capa}    className="img-fluid shadow rounded book-cover" alt="" />

                </div>

                <h5 style={{fontStyle: "bold", textDecoration: "none"}} className="link-dark mt-1 mb-1">{titulo}</h5>
                <h6 style={{fontStyle: "italic"}} className="link-dark">{autor}</h6>
            </Link>
        </div>
    </>
  )
}

export default LinkBook   