import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: 'Autenticação inválida',
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await User.findOne({ where: { id, email } });
    if (!user) {
      return response.status(401).json({
        error: 'Usuário inválido',
      });
    }
    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (e) {
    return response.status(401).json({
      error: 'Token expirado ou inválido',
    });
  }
};
