import express from 'express';

// INICIALIZANDO O EXPRESS \\
const app = express();

// MIDDLEWARES \\
app.use(express.json());

// EXPORTANDO O APP \\
export default app;
