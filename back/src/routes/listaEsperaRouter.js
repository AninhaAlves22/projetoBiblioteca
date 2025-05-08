import express from 'express';
import listaEsperaController from '../controllers/listaEsperaController.js'

const routes = express.Router();

routes.post("/lista-espera", listaEsperaController.adicionaUsuario);
routes.get('/lista-espera/:livroId', listaEsperaController.listarEsperaPorLivro);

export default routes;