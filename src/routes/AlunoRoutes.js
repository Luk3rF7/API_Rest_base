// === imports ===
import { Router } from 'express';
import alunoController from '../controller/AlunoController';
import loginRequired from '../middlewares/loginRequired';
// === setting router ===
const router = new Router();
// === rotas Alunos ===
router.get('/', alunoController.index);
router.get('/:id', loginRequired, alunoController.show);

router.post('/', alunoController.store);
router.put('/:id', loginRequired, alunoController.update);
router.delete('/:id', loginRequired, alunoController.delete);

// === exports ===

export default router;
