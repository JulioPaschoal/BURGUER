// CONFIGURAÇÃO DO CONTROLLER DE PRODUTO \\
import * as yup from 'yup';
import Product from '../model/Product.js';
import Category from '../model/Category.js';

class ProductControllers {
  // VALIDANDO OS DADOS DO PRODUTO \\
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      category_id: yup.number().required(),
      offer: yup.boolean(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // RECEBENDO OS DADOS DO PRODUTO VALIDADOS \\
    const { name, price, category_id, offer } = req.body;
    const { filename } = req.file;

    // CRIANDO O PRODUTO \\
    const product = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    return res.status(201).json(product);
  }

  // LISTANDO TODOS OS PRODUTOS \\
  async index(req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });
    return res.status(200).json(products);
  }

  // EDITANDO UM PRODUTO \\
  async update(req, res) {
    // VALIDANDO OS DADOS DO PRODUTO \\
    const schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      category_id: yup.number(),
      offer: yup.boolean(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // RECEBENDO OS DADOS DO PRODUTO VALIDADOS \\
    const { name, price, category_id, offer } = req.body;
    const { id } = req.params;
    let path;
    if (req.file) {
      const { filename } = req.file;
      path = filename;
    }

    // ATUALIZANDO O PRODUTO \\
    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    return res.status(200).json();
  }
}

export default new ProductControllers();
