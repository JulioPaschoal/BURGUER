// CONFIGURAÇÃO DAS ROTAS \\
import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';
import SessionControllers from './app/controllers/SessionControllers.js';
import ProductControllers from './app/controllers/ProductControllers.js';
import multerConfig from './config/multer.cjs';
import multer from 'multer';
import authMiddleware from './middlewares/auth.js';
import CategoryControllers from './app/controllers/CategoryControllers.js';
import adminMiddleware from './middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

// CONFIGURAÇÃO DE UPLOAD DE ARQUIVOS \\
const upload = multer(multerConfig);

// ROTAS DE USUÁRIO \\
routes.post('/users', UserControllers.store);

// ROTAS DE SESSÃO \\
routes.post('/sessions', SessionControllers.store);

// ROTAS PROTEGIDAS \\
routes.use(authMiddleware);

// ROTAS DE PRODUTO \\
routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductControllers.store,
);
routes.put(
  '/products/:id',
  adminMiddleware,
  upload.single('file'),
  ProductControllers.update,
);
routes.get('/products', ProductControllers.index);

// ROTAS DE CATEGORIA \\
routes.post(
  '/categories',
  upload.single('file'),
  adminMiddleware,
  CategoryControllers.store,
);
routes.put(
  '/categories/:id',
  upload.single('file'),
  adminMiddleware,
  CategoryControllers.update,
);
routes.get('/categories', CategoryControllers.index);
export default routes;

// RATA DE PEDIDOS \\
routes.post('/orders', OrderController.store);
