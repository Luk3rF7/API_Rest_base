// === imports ===
import jwt from 'jsonwebtoken';
import User from '../models/User';

// === config middleware ===
export default async (req, res, next) => {
  // == destruction para pega token
  // checa se usuario esta logado
  const { authorization } = req.headers;

  // validação
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required !'],
    });
  }
  // destruction para remover espaço no breade + tokenkey
  const [, token] = authorization.split(' ');

  try {
    // === checando o token === verify ->verificar token
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    // === destruction ===
    const { id, email } = dados;
    //= = checando na DB ===
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido!'],
      });
    }

    //= = adicionando na requisição
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido!'],
    });
  }
};
