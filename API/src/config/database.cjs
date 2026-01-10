// CONFIGURAÇÃO DO BANCO DE DADOS \\
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'admin',
  password: '@505619',
  database: 'burguer',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
