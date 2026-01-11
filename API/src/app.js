import express from 'express';
import routes from './routes.js';

// INICIALIZANDO O EXPRESS \\
const app = express();

// MIDDLEWARES \\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTAS \\
app.use(routes);

// EXPORTANDO O APP \\
export default app;
