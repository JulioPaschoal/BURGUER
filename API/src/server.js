import 'dotenv/config';

import app from './app.js';
import database from './database/index.js';

// DEFININDO A PORTA DO SERVIDOR \\
const PORT = process.env.APP_PORT || 3000;

// INICIALIZANDO O SERVIDOR  \\
app.listen(PORT, () => {
  console.log(`${process.env.APP_URL}:${PORT}`);
});
