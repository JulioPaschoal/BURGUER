import "dotenv/config";

import app from "./app.js";

// DEFININDO A PORTA DO SERVIDOR \\
const PORT = process.env.APP_PORT || 3000;

// INICIALIZANDO O SERVIDOR  \\
app.listen(PORT, () => {
  console.log(`${process.env.APP_URL}:${PORT}`);
});
