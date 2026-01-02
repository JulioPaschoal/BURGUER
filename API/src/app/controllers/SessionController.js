import bcrypt from 'bcrypt';
import * as Yup from 'yup';

import User from '../model/User.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body, { strict: true });
    if (!isValid) {
      return res.status(400).json({ error: 'Email or password is required' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new SessionController();
