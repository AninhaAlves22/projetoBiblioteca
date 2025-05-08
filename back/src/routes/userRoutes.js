import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.post("/cadastro", UserController.criarUsuario);
routes.post("/login", UserController.loginUsuario);
routes.get("/usuario/busca", UserController.buscarUsuarios);
routes.get("/usuario/:id", UserController.buscarUsuarioPorId);


export default routes;