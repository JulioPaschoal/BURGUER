// CONFIGURAÇÃO DO MIDDLEWARE DE AUTENTICAÇÃO \\
const adminMiddleware = async (req, res, next) => {
  // SEPARANDO O TOKEN DE ACESSO \\
  const IsUserAdmin = req.userIsAdmin;
  if (!IsUserAdmin) {
    return res.status(401).json();
  }

  return next();
};

export default adminMiddleware;
