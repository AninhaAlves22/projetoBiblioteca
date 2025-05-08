import express from "express";
import EmprestimoController from "../controllers/emprestimoController.js";

const routes = express.Router();

routes.post("/emprestimos", EmprestimoController.criarEmprestimo);
routes.get("/emprestimos", EmprestimoController.listarEmprestimos);
routes.get("/emprestimoUser/:id", EmprestimoController.listarEmprestimosPorUsuario);
routes.get("/emprestimoLivro/:id", EmprestimoController.listarEmprestimosPorLivro);



export default routes;