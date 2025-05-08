import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: {type: String, required: true},
    dataNasc: {type: Date},
    dataCadastro: {type: Date, default: Date.now},
    nome: { type: String},
    celular: { type: String },
    descricao: {type: String},
    credencial: {type: String, required: true},
   }, {versionKey: false});

const user = mongoose.model("user", userSchema);

export default user;