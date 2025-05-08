import ListaEspera from "../models/ListaEspera.js";

class ListaEsperaController{
  static async adicionaUsuario(req, res){
    const { usuarioId, livroId } = req.body;

    try {
      const existente = await ListaEspera.findOne({ usuario: usuarioId, livro: livroId });
      if (existente) {
        return res.status(400).json({ mensagem: "Usuário já está na lista de espera para este livro." });
      }

      const novaEntrada = new ListaEspera({ usuario: usuarioId, livro: livroId });
      await novaEntrada.save();

      res.status(201).json({ mensagem: "Usuário adicionado à lista de espera com sucesso." });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao adicionar à lista de espera.", erro });
    }
  };

  static async listarEsperaPorLivro(req, res){
    const { livroId } = req.params;

    try {
      const lista = await ListaEspera.find({ livro: livroId })
        .populate('usuario', 'nome email') 
        .sort({ dataSolicitacao: 1 }); 

      res.status(200).json(lista);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao buscar lista de espera.", erro });
    }
  };
};

export default ListaEsperaController;
