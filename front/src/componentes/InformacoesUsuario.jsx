import React from 'react'

const InformacoesUsuario = ({nome, email, dataNasc, dataCadastro, celular}) => {
  return (
    <>
      <div className="border bg-light mt-5 rounded shadow">

        <div className="row p-2">

          <div className="col-lg-6 fs-5 ">
            <span className="fw-bold ">Nome:</span> {nome}
          </div>
          <div className="col-lg-6 fs-5 ">
            <span className="fw-bold ">E-mail:</span> {email}
          </div>
          <div className="col-lg-3 fs-5 mt-4">
            <span className="fw-bold ">Data de Nascimento:</span> {new Date(dataNasc).toLocaleDateString()}
          </div>
          <div className="col-lg-3 fs-5 mt-4">
            <span className="fw-bold ">Data de Registro:</span> {new Date(dataCadastro).toLocaleDateString()}
          </div>
          <div className="col-lg-6 fs-5 mt-4">
            <span className="fw-bold ">Cel:</span> {celular}
          </div>
          <div className="col-lg-6 fs-5 mt-4">
            <span className="fw-bold ">Situação:</span> Regular
          </div>

        </div>
      
      </div>

      <div className="border bg-light mt-5 rounded shadow">

        <div className="row p-2">

          <div className="col-lg-12 fs-5 "  style={{textAlign: "justify"}}>
            <span className="fw-bold ">Descrição:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare, velit at rutrum lobortis, leo dolor sagittis sapien, eu commodo ante lacus et dolor. Praesent blandit lobortis ex, at faucibus ipsum. Nulla aliquet dui sem, id vestibulum augue pharetra quis. Aenean interdum tempor nulla eu porta. Proin pellentesque lectus at nunc semper, quis feugiat enim varius. Curabitur erat erat, iaculis eu ante non, aliquet feugiat mauris. Aliquam ut laoreet ante, nec laoreet ex. Quisque malesuada ipsum eu justo venenatis laoreet. Maecenas suscipit erat ut magna scelerisque gravida.
          </div>

        </div>
        
      </div>
    </>
    )
}

export default InformacoesUsuario