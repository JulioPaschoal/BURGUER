import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  const token = authToken.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        throw new Error();
      }
      req.userId = decoded.id;
      req.userIsAdmin = decoded.admin;
    });
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
  return next();
};

export default authMiddleware;
