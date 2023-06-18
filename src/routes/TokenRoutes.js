// === imports ===
import { Router } from 'express';
import TokenController from '../controller/TokenController';

//  === routes & settings ===

const router = new Router();

// ==== config routes ===
router.post('/', TokenController.store);

export default router;
