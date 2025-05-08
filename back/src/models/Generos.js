import mongoose from "mongoose";


const generosSchema = new mongoose.Schema({
    nome:{ type: String, required: true },
    
}, { versionKey:false })

const genero = mongoose.model("generos", generosSchema);

export default genero;