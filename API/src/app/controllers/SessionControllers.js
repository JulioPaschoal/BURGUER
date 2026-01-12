import * as yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../model/User.js';

class SessionControllers {
  async store(req, res) {
    // VALIDANDO OS DADOS DA SESSÃO \\
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    });

    // MENSAGEM DE ERRO \\
    const emailPasswordIncorrect = () => {
      return res.status(400).json({ error: 'E-mail or password is incorrect' });
    };

    // VALIDANDO OS DADOS DA SESSÃO \\
    const isValid = await schema.isValid(req.body);
    if (!isValid) {
      emailPasswordIncorrect();
    }

    // RECEBENDO OS DADOS DA SESSÃO VALIDADOS \\
    const { email, password } = req.body;

    // VERIFICANDO SE O E-MAIL EXISTE \\
    const user = await User.findOne({ where: { email } });
    if (!user) {
      emailPasswordIncorrect();
    }

    // VERIFICANDO SE A SENHA É VÁLIDA \\
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      emailPasswordIncorrect();
    }

    // RETORNANDO OS DADOS DO USUÁRIO LOGADO \\
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new SessionControllers();
