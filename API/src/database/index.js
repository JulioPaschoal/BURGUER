// CONFIGURAÇÃO DO BANCO DE DADOS \\

import { Sequelize } from 'sequelize';

import User from '../app/model/User.js';
import databaseConfig from '../config/database.cjs';
import Product from '../app/model/Product.js';
import Category from '../app/model/Category.js';

// PASSANDO AS CONFIGURAÇÕES DO BANCO DE DADOS \\
const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
