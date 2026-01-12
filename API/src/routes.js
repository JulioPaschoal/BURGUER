// CONFIGURAÇÃO DAS ROTAS \\

import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';
import SessionControllers from './app/controllers/SessionControllers.js';

const routes = new Router();

// ROTAS DE USUÁRIO \\
routes.post('/users', UserControllers.store);

// ROTAS DE SESSÃO \\
routes.post('/sessions', SessionControllers.store);

export default routes;
