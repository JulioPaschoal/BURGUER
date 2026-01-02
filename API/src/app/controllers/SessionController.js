import bcrypt from 'bcrypt';
import * as Yup from 'yup';

import User from '../model/User.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    const isValid = await schema.isValid(req.body, { strict: true });
    if (!isValid) {
      return res.status(400).json({ error: 'Email or password is required' });
    }
    const { email, password } = req.body;
    const existsUser = await User.findOne({ where: { email } });
    if (!existsUser) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existsUser.password_hash,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    return res.status(200).json({
      id: existsUser.id,
      name: existsUser.name,
      email: existsUser.email,
      admin: existsUser.admin,
    });
  }
}

export default new SessionController();
