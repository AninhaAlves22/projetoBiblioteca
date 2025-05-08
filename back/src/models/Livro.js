import mongoose from "mongoose";


const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    titulo:{ type: String, required: true },
    autor: {type: String},
    editora: {type: String},
    anoPublicacao: {type: String},
    paginas: {type: Number},
    generos: [{ type: String }],
    sinopse: { type: String },
    capa: {type: String},
    exemplares: { type: Number },
}, { versionKey:false })

const livro = mongoose.model("livro", livroSchema);

export default livro;