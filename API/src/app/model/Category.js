// CONFIGURAÇÃO DO MODELO DE CATEGORIA \\
import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}:${process.env.APP_PORT}/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'categories',
      },
    );
    return this;
  }
}

export default Category;
