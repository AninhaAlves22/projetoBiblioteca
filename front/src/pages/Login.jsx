import React from 'react';
import LoginArea from '../componentes/LoginArea';

function Login() {
  return (
    <LoginArea
      titulo = "Login"
      mensagem = "de volta!"
      option= "Não tem uma conta?"
      path= "/cadastro"
      comando= "Cadastre-se"
     />
  );
}

export default Login;
