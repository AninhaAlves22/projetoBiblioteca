import express from "express";
import GeneroController from "../controllers/generoController.js";

const routes = express.Router();

routes.get("/generos", GeneroController.listarGeneros);


export default routes;