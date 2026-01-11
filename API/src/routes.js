// CONFIGURAÇÃO DAS ROTAS \\

import { Router } from 'express';
import User from './app/model/User.js';
import { v4 } from 'uuid';

const routes = new Router();

// ROTAS \\
routes.get('/', async (req, res) => {
  const user = {
    id: v4(),
    name: 'Julio Paschoal',
    email: 'juliocpaschoal@gmail.com',
    password_hash: '123456',
    admin: false,
  };

  await User.create(user);

  return res.status(200).json(user);
});

export default routes;
