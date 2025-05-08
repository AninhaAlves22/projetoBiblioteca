import Genero from "../models/Generos.js";

class GeneroController {
  static async listarGeneros (req, res){
  try{
      const listaGeneros = await Genero.find({});
      res.status(200).json(listaGeneros);
  } catch ( erro ){
      res.status(500).json({ message: `${erro.message} - falha na requisição` })
  };
  };
}

export default GeneroController;