import Emprestimo from "../models/Emprestimos.js";
import Livro from "../models/Livro.js";

class EmprestimoController {
  static async criarEmprestimo(req, res) {
    try {
      const { usuarioId, livroId } = req.body;

      
      const livro = await Livro.findById(livroId);
      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }

      
      if (livro.exemplares < 1) {
        return res.status(400).json({ message: "Sem exemplares disponíveis." });
      }

      const emprestimoExistente = await Emprestimo.findOne({
        usuario: usuarioId,
        livro: livroId,
        devolvido: false 
      });
      if (emprestimoExistente) {
        return res.status(400).json({ message: "Você já possui um empréstimo ativo deste livro." });
      }
      
      const novoEmprestimo = await Emprestimo.create({
        usuario: usuarioId,
        livro: livroId,
      });

         
      livro.exemplares -= 1;
      await livro.save();

      res.status(201).json({ message: "Empréstimo realizado com sucesso!", emprestimo: novoEmprestimo });
      
    } catch (error) {
      res.status(500).json({ message: "Erro ao realizar empréstimo.", error: error.message });
    }
  }

  static async listarEmprestimos(req,res){
    try{
      const listaEmprestimos = await Emprestimo.find({})
        .sort({ dataEmprestimo: -1 })
        .populate('usuario', 'nome email')
        .populate('livro', 'titulo autor');
      res.status(200).json(listaEmprestimos);
  } catch ( erro ){
      res.status(500).json({ message: `${erro.message} - falha na requisição` })
  };
  };

  static async listarEmprestimosPorUsuario(req, res) {
    try {
      const { id } = req.params;
  
      const emprestimos = await Emprestimo.find({ usuario: id })
        .sort({ dataEmprestimo: -1 })
        .populate('livro', 'titulo');
  
      res.status(200).json(emprestimos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - erro ao buscar empréstimos do usuário` });
    }
  };

  static async listarEmprestimosPorLivro(req, res) {
    try {
      const { id } = req.params;
  
      const emprestimos = await Emprestimo.find({ livro: id })
        .sort({ dataEmprestimo: -1 })
        .populate('usuario', 'nome email');
  
      res.status(200).json(emprestimos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - erro ao buscar empréstimos do livro` });
    }
  };
}

export default EmprestimoController;
