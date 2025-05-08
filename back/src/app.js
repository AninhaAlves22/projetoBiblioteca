import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import cors from 'cors';
import routes from "./routes/index.js";

const conexao = await conectaNaDataBase(); //executa a conexão com o mongo

conexao.on("error", (error)=>{
    console.error("Erro de conexão", error); //exibe uma mensagem de erro se acontecer algum erro na conexão
});

conexao.once("open", ()=>{ 
    console.log("Conexão com o banco feita com sucesso"); 
});

const app = express();
app.use(cors());  // Isso vai permitir que qualquer domínio acesse seu backend
routes(app); //executa a função routes (importada de routes/index.js)

export default app;


