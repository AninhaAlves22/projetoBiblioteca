import bcrypt from "bcrypt";
import user from "../models/User.js"; 
import mongoose from "mongoose";


class UserController {
  static async criarUsuario(req, res){

    const {email, senha} = req.body
    const novoUsuario = req.body;

    try{
          const usuarioExistente = await user.findOne({ email });
          if (usuarioExistente) {
              return res.status(400).json({ message: "E-mail já cadastrado." });
          }
          
          const senhaCriptografada = await bcrypt.hash(senha, 10);

          const usuarioCriado = await user.create({
            ...novoUsuario, senha: senhaCriptografada
          });

          const { senha: _, ...usuarioSemSenha } = usuarioCriado.toObject();

          res.status(201).json({
              message: "Usuário criado com sucesso!",
              usuario: usuarioSemSenha
          });
      } catch (erro) {
      res.status(500).json({
          message: `${erro.message} - falha ao cadastrar usuário`
      });
  }
  }


  static async loginUsuario(req, res) {

      const { email, senha } = req.body;
  
      try {
        const usuario = await user.findOne({ email });
  
        if (!usuario) {
          return res.status(404).json({ message: "Usuário não encontrado" });
        }
  
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
        if (!senhaValida) {
          return res.status(401).json({ message: "Senha incorreta" });
        }
  
        
        const { senha: _, ...usuarioSemSenha } = usuario.toObject();
  
        res.status(200).json({
          message: "Login realizado com sucesso",
          usuario: usuarioSemSenha
        });
  
      } catch (erro) {
        res.status(500).json({
          message: `${erro.message} - erro ao realizar login`
        });
      }
  };

  static async buscarUsuarioPorId(req, res){
    try{
      const id = req.params.id; //salva o id recebido atraves da requisição
      const usuarioEncontrado = await user.findById(id);

      const { senha: _, ...usuarioSemSenha } = usuarioEncontrado.toObject();
      res.status(200).json(usuarioSemSenha);
    } catch ( erro ){
      res.status(500).json({ message: `${erro.message} - falha na requisição do usuário` })
  };
};



  // Buscar usuario por nome, email ou id (consulta genérica)
  static async buscarUsuarios(req, res) {
    try {
      const termo = req.query.q;

      if (!termo || termo.trim() === "") {
        return res.status(400).json({ message: "Parâmetro de busca vazio" });
      }
      
      const regex = new RegExp(termo, "i"); // 'i' = case insensitive

      const condicoesBusca = [
        { nome: regex },
        { email: regex }
      ];

      if (mongoose.Types.ObjectId.isValid(termo)) {
        condicoesBusca.push({ _id: termo });
      }

      const usuariosEncontrados = await user.find({
      $or: condicoesBusca
    });

      const usuariosSemSenhas = usuariosEncontrados.map(usuario => {
        const usuarioObj = usuario.toObject();
        const { senha, ...semSenha } = usuarioObj;
        return semSenha;
      });
      
      res.status(200).json( usuariosSemSenhas  );
    }catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na busca de ususario` });
  };
  };
}
export default UserController;
