// CONFIGURAÇÃO DO CONTROLLER DE PEDIDOS \\
import * as yup from 'yup';
import Product from '../model/Product.js';
import Category from '../model/Category.js';
import Order from '../schemas/Order.js';

class ProductControllers {
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

    // MONTANDO O PEDIDO \\
    const { userId, userName } = req;
    const { products } = req.body;

    // MAPEAR OS IDS DOS PRODUTOS \\
    const productIds = products.map((product) => product.id);

    // BUSCAR PRODUTOS NO BANCO DE DADOS \\
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

    // FORMATARDO OS PRODUTOS ENCONTRADOS \\
    const mapedProducts = findedProducts.map((product) => {
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity: products.find((p) => p.id === product.id).quantity,
      };
      return newProduct;
    });

    //

    const order = {
      user: { id: userId, name: userName },
      products: mapedProducts,
      status: 'Pedido realizado com sucesso',
    };

    // CRIANDO O PEDIDO NO BANCO DE DADOS \\
    const NewOrder = await Order.create(order);

    return res.status(201).json(NewOrder);
  }
}

export default new ProductControllers();
