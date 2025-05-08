import React from 'react'
import LoginArea from '../componentes/LoginArea'

const Cadastro = () => {
  return (
    <LoginArea
        titulo = "Cadastre-se"
        mensagem= ""
        option= "Já tem uma conta?"
        path= "/login"
        comando= "Entre"
     />
  )
}

export default Cadastro