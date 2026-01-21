// CONFIGURAÇÃO DO CONTROLLER DE CATEGORIA \\
import * as yup from 'yup';
import Category from '../model/Category.js';

class CategoryControllers {
  // CRIANDO UMA NOVA CATEGORIA \\
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
    });
    // RECEBENDO OS DADOS DA CATEGORIA VALIDADOS \\
    const { name } = req.body;
    const { filename } = req.file;
    // VERIFICANDO SE A CATEGORIA JÁ EXISTE \\
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    // VALIDANDO OS DADOS DA CATEGORIA \\
    try {
      await schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
    // CRIANDO A CATEGORIA \\
    const category = await Category.create({ name, path: filename });
    // RETORNANDO A CATEGORIA CRIADA \\
    return res.status(201).json(category);
  }

  // LISTANDO TODAS AS CATEGORIAS \\
  async index(req, res) {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  }
}

export default new CategoryControllers();
