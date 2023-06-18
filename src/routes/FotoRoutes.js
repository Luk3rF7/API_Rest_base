// === import primmeiros ===
import { Router } from 'express';
// === import modules locais depois dos imports principais ===
import loginRequired from '../middlewares/loginRequired';
import fotoController from '../controller/FotoController';

const router = new Router();
router.post('/', loginRequired, fotoController.store);
export default router;
