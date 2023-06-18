// === imports ===
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      // === checando se email / pass estao preenchido ===
      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválida'],
        });
      }

      // === confirir se tem na base de dado e jwt
      const user = await User.findOne({
        where: { email },
      });
        // === checkando user se existe ===
      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      // === checkando metodo password do model aqui :
      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['senha inválida'],
        });
      }

      // pega id do usuario:
      const { id } = user;

      // === jwt settings ===
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      // === playlaod: são dado que queremos recuperar dps do usuario ===
      // === token secreto ===
      // === config temp de expiração do token ===

      return res.json({
        token,
        user: { nome: user.nome, id, email },
      });
    } catch (e) {
      return console.log(e);
    }
  }
}
export default new TokenController();
