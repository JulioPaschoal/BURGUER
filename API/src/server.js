import app from './app.js';
import database from './database/index.js';

app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_URL}:${process.env.APP_PORT}`);
});
