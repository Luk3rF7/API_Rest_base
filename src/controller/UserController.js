//= == imports ====
import User from '../models/User';
//= == class ====
class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(
        req.body, // <<- receber dados criado
      );
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      // error bad = 400
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      // config pra evita de mostrar dados no show:
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      // utilizo findByPk = busca pelo primary key
      const users = await User.findByPk(req.params.id);
      // config para mostrar necessario:
      const { id, nome, email } = users;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // update
  async update(req, res) {
    try {
      /*    // === chekcando se tem Id ===
      if (!req.userId) {
        return res.status(400).json({
          errors: ['ID não encontrado!'],
        });
      } */
      // pegando usuario da Primary Key:
      const user = await User.findByPk(req.userId);
      // === checkando usuario ==
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado!'],
        });
      }
      // variavel que vai atualizar bd
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontro'],
        });
      }
      user.destroy();
      return res.json(null);
    } catch (e) {
      return res.json(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
