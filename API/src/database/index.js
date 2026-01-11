// CONFIGURAÇÃO DO BANCO DE DADOS \\

import { Sequelize } from 'sequelize';

import User from '../app/model/User.js';
import databaseConfig from '../config/database.cjs';

// PASSANDO AS CONFIGURAÇÕES DO BANCO DE DADOS \\
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
