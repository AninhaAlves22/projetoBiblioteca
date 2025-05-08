import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema({
  usuario : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  livro: { type: mongoose.Schema.Types.ObjectId, ref: 'livro', required: true},
  tituloLivro: { type: String },
  dataEmprestimo: { type: Date, default: Date.now}, 
  dataDevolucaoPrevista: { 
    type: Date, 
    default: function() {
      const hoje = new Date();
      hoje.setDate(hoje.getDate() + 15); // adiciona 15 dias
      return hoje;
  }},
  dataDevolucao:{ type: Date},devolvido: {
    type: Boolean,
    default: false
  },
  protocolo: {
    type: String,
    unique: true,
    default: function() {
      const random = Math.floor(Math.random() * 10000); // Número aleatório de 0 a 9999
      const date = new Date();
      const dateStr = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
      return `EMP-${dateStr}-${random}`;
    }
  }
},{ versionKey: false});

const Emprestimo = mongoose.model('emprestimos', emprestimoSchema)

export default Emprestimo;