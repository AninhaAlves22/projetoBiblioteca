import React,  { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../assets/funcoes/authContext';


const LoginForm = ({titulo}) => {

  const { pathname } = useLocation();
  const isCadastro = pathname === "/cadastro";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCadastro && senha !== senhaRepetida) {
      alert("As senhas não coincidem.");
      return;
    }

    const usuario = {
      email,
      senha,
      credencial: isCadastro ? "usuario" : undefined
    };

    try {
      const resposta = await fetch(`http://localhost:3000/${isCadastro ? 'cadastro' : 'login'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert(`${isCadastro ? 'Cadastro' : 'Login'} realizado com sucesso!`);
        setEmail('');
        setSenha('');
        setSenhaRepetida('');
        
        if (!isCadastro) {
          login(dados.usuario);
          if(dados.usuario.credencial === 'admin'){
            navigate('/menu-adm')
          }else{
            navigate('/')
          }
        } else {
          navigate('/login');
        }
      } else {
        alert("Erro: " + dados.message);
      }
    } catch (erro) {
      alert("Erro de conexão com o servidor");
      console.error(erro);
    }
  };


  return (
    <form onSubmit={handleSubmit} >
      <div className="mb-3">
          <label htmlFor="emailLogin">Email:</label>
          <input type="email" id="emailLogin" className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
    
      <div className="mb-3">
          <label htmlFor="senhaLogin">Senha:</label>
          <input type="password" id="senhaLogin" className="form-control" 
          value={senha} onChange={(e) => setSenha(e.target.value)} />
      </div>
    

      {isCadastro && (<div className="mb-3">
                        <label htmlFor="senhaCadastroRepeticao">Repita sua senha:</label>
                        <input type="password" id="senhaCadastroRepeticao" className="form-control"
                        value={senhaRepetida}
                        onChange={(e) => setSenhaRepetida(e.target.value)}/>
                      </div>) }
                      
      <div className="d-flex gap-2 mb-2">
          <button className="btn btn-warning" type="submit">{titulo}</button>
          
          
      </div>
                                    
    </form>
  )
}

export default LoginForm