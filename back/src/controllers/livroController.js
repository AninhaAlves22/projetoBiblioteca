import livro from "../models/Livro.js"


class LivroController {
  //método para adicionar livro
  static async cadastraLivro(req,res){
    const novoLivro = req.body //salva o corpo da requisição
    try{
      const livroCriado = await livro.create(novoLivro);
      res.status(201).json({message: "criado com sucesso", livro: livroCriado}); //criamos um obj, message e livro são propriedades do obj
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha ao cadastrar livro` }); //catch nos permite acessar o erro
    };
  };
  
  //metodo para listar todos os livros
  static async listarLivros (req, res){
      try{
          const listaLivros = await livro.find({});
          res.status(200).json(listaLivros);
      } catch ( erro ){
          res.status(500).json({ message: `${erro.message} - falha na requisição` })
      };
  };

  //listar livro por ID
  static async listarLivroPorId (req, res){
    try{
        const id = req.params.id; //salva o id recebido atraves da requisição
        const livroEncontrado = await livro.findById(id);
        res.status(200).json(livroEncontrado);
    } catch ( erro ){
        res.status(500).json({ message: `${erro.message} - falha na requisição do livro` })
    };
  };

// Buscar livros por autor, título ou gênero (consulta genérica)
  static async buscarLivros(req, res) {
    try {
      const termo = req.query.q;

      if (!termo || termo.trim() === "") {
        return res.status(400).json({ message: "Parâmetro de busca vazio" });
      }
      
      const regex = new RegExp(termo, "i"); // 'i' = case insensitive

      const livrosEncontrados = await livro.find({
        $or: [
          { titulo: regex },
          { autor: regex },
          { generos: regex }
        ]
      });

    res.status(200).json(livrosEncontrados);
  } catch (erro) {
    res.status(500).json({ message: `${erro.message} - falha na busca de livros` });
  };
};

  //atualizar livro 
  static async atualizarLivro (req, res){
    try{
        const id = req.params.id; //salva o id recebido atraves da requisição
        await livro.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Livro atualizado" });
    } catch ( erro ){
        res.status(500).json({ message: `${erro.message} - falha na atulização do livro` })
    };
  };

  //deleta livro 
  static async deletarLivro (req, res){
    try{
        const id = req.params.id; //salva o id recebido atraves da requisição
        await livro.findByIdAndDelete(id);
        res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch ( erro ){
        res.status(500).json({ message: `${erro.message} - falha na exclusão do livro` })
    };
  };
        
};


export default LivroController;