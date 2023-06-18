// === imports ===
import { Router } from 'express'; // <- framework
import homeController from '../controller/HomeController';

// ==== config enviar e receber ====
const router = new Router();

// fazendo rotas home
router.get('/', homeController.index);
export default router;
