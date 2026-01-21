import jwt from 'jsonwebtoken';

// CONFIGURAÇÃO DO MIDDLEWARE DE AUTENTICAÇÃO \\
const authMiddleware = async (req, res, next) => {
  // SEPARANDO O TOKEN DE ACESSO \\
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // VERIFICANDO SE O TOKEN DE ACESSO É VÁLIDO \\
  const [, token] = authToken.split(' ');
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        throw Error();
      }
      req.userId = decode.id;
      req.userIsAdmin = decode.admin;
    });
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
  return next();
};

export default authMiddleware;
