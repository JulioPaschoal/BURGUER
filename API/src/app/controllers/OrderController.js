// CONFIGURAÇÃO DO CONTROLLER DE PEDIDOS \\
import * as yup from 'yup';
import Product from '../model/Product.js';
import Category from '../model/Category.js';

class OrderController {
  // VALIDANDO OS DADOS DO PRODUTO \\
  async store(req, res) {
    const schema = yup.object().shape({
      products: yup
        .array()
        .required()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            quantity: yup.number().required(),
          }),
        ),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
    // CRIANDO UM NOVO PEDIDO \\
    const { userId, userName } = req;
    const { products } = req.body;
    // BUSCANDO OS PRODUTOS NO BANCO DE DADOS \\
    const productIds = products.map((product) => product.id);
    const findedProducts = await Product.findAll({
      where: {
        id: productIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });
    // MAPENANDO A QUANTIDADE DE CADA PRODUTO \\
    const mappedProducts = findedProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity,
      };
      return newProduct;
    });
    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mappedProducts,
      status: 'Pedido realizado com sucesso',
    };
    return res.status(201).json(order);
  }
}

export default new OrderController();
