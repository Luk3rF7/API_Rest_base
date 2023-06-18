// === import ===
import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  // === metodo visualizar user ===
  async index(req, res) {
    try {
      const aluno = await Aluno.findAll({
        attibutes: [
          // <- atributos que quero :
          'id',
          'nome',
          'email',
          'peso',
          'altura',
        ],
        order: [
          // <- odenamento
          // <- pode conter mais de um ordenamento utilizo matrix
          ['id', 'DESC'],
          [Foto, 'id', 'DESC'],
        ],
        include: {
          model: Foto,
          attributes: [
            // <-- atributo da foto
            'url',
            'filename',

          ],
        },
      });
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //  === metodo criar aluno / ===
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(
        req.body, // <<- receber dados criado
      );
      const { id, nome, email } = novoAluno;
      return res.json({ id, nome, email });
    } catch (e) {
      // error bad = 400
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // === msotrar todo aluno ===
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: { model: Foto, attributes: ['url', 'filename'] },
      });
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado!'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // === metodo deletar Aluno ===
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Usuário não encontrado!'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          error: ['Aluno não encontrado!'],
        });
      }
      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.json(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // === metodo atualizar Aluno ===
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando Id'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Usuário não encontrado!'],
        });
      }
      const alunoAtualizado = await aluno.update(req.body);
      return res.json(alunoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new AlunoController();
