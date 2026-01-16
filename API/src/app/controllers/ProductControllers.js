// CONFIGURAÇÃO DO CONTROLLER DE PRODUTO \\
import * as yup from 'yup';
import Product from '../model/Product.js';

class ProductControllers {
  // VALIDANDO OS DADOS DO PRODUTO \\
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      category: yup.string().required(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // RECEBENDO OS DADOS DO PRODUTO VALIDADOS \\
    const { name, price, category } = req.body;
    const { filename } = req.file;

    // CRIANDO O PRODUTO \\
    const product = await Product.create({
      name,
      price,
      category,
      path: filename,
    });
    return res.status(201).json(product);
  }

  // LISTANDO TODOS OS PRODUTOS \\
  async index(req, res) {
    const products = await Product.findAll();
    return res.status(200).json(products);
  }
}

export default new ProductControllers();
