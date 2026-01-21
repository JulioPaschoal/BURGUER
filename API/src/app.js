import express from 'express';
import routes from './routes.js';
import fileRouteConfig from './config/fileRoutes.cjs';

// INICIALIZANDO O EXPRESS \\
const app = express();

// MIDDLEWARES \\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTAS DE ARQUIVOS \\
app.use('/product-file', fileRouteConfig);
app.use('/category-file', fileRouteConfig);

// ROTAS \\
app.use(routes);

// EXPORTANDO O APP \\
export default app;
