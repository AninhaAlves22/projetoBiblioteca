import React from 'react'
import { useNavigate } from 'react-router-dom'

const BotaoVoltar = () => {
  const navigate = useNavigate();
  return (
       <section style={{marginTop: "5rem"}}>
              <div className="container-fluid">
                  <button onClick={()=>navigate(-1)} className="btn btn-dark" style={{textDecoration: "none"}}>
                      <i className="fa-solid fa-arrow-left"></i>
                  </button>
              </div>
          </section>
  )
}

export default BotaoVoltar