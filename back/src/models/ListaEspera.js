import mongoose from 'mongoose';

const listaEsperaSchema = new mongoose.Schema({
  usuario : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  livro: { type: mongoose.Schema.Types.ObjectId, ref: 'livro', required: true},
  dataSolicitacao: { type: Date, default: Date.now}, 

}, {versionKey: false});

const ListaEspera = mongoose.model('listaEspera', listaEsperaSchema);

export default ListaEspera;