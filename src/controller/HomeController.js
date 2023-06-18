// === imports ===
import Aluno from '../models/Aluno';
//= == Controllers ===
class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'user',
      sobrenome: 'name',
      email: 'user4@example.com',
      idade: 27,
      peso: 52,
      altura: 1.6,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
