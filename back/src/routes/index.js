import express from "express";
import livros from "./livrosRoutes.js"
import user from "./userRoutes.js";
import generos from "./generosRoutes.js"
import emprestimo from "./emprestimosRoutes.js"
import listaEspera from "./listaEsperaRouter.js"


//agrupa todas as rotas que iremos receber
const routes = (app)=>{       //app é uma instancia do express recebido em app.js       
    app.route("/").get((req, res)=> res.status(200).send("Curso de Node.js"));
    app.use(express.json(), livros, user, generos, emprestimo, listaEspera );
};


export default routes;