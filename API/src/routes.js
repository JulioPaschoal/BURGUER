// CONFIGURAÇÃO DAS ROTAS \\

import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';

const routes = new Router();

// ROTAS DE USUÁRIO \\
routes.post('/users', UserControllers.store);

export default routes;
