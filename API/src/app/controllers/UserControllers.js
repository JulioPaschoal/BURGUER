// CONFIGURAÇÃO DO CONTROLLER DE USUÁRIO \\
import User from '../model/User.js';
import { v4 } from 'uuid';

class UserControllers {
  async store(req, res) {
    // RECEBENDO OS DADOS DO USUÁRIO \\
    const { name, email, password_hash, admin } = req.body;
    // VERIFICANDO SE O E-MAIL JÁ EXISTE \\
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

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
