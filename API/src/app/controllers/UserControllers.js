// CONFIGURAÇÃO DO CONTROLLER DE USUÁRIO \\
import User from '../model/User.js';
import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

class UserControllers {
  async store(req, res) {
    // VALIDANDO OS DADOS DO USUÁRIO \\
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      admin: yup.boolean(),
    });
    try {
      await schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    // RECEBENDO OS DADOS DO USUÁRIO VALIDADOS \\
    const { name, email, password, admin } = req.body;

    // VERIFICANDO SE O E-MAIL JÁ EXISTE \\
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // CRIPTOGRAFANDO A SENHA \\
    const password_hash = await bcrypt.hash(password, 10);

    // CRIANDO O USUÁRIO \\
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    // RETORNANDO O USUÁRIO CRIADO \\
    return res.status(200).json({
      id: user.id,
      name: user.name,
       email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserControllers();
