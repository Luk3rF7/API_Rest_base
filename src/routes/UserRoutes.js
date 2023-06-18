// === imports ===
import { Router } from 'express';
import userController from '../controller/UserController';
import loginRequired from '../middlewares/loginRequired';
// ==== config enviar e receber ====
const router = new Router();

// fazendo rotas home -  qndo for metodo criando create/store

//      === nao deveria existir ===
router.get('/', userController.index); // lista users
router.get('/:id', userController.show); // lista users

// essas rota são necessario :
router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

// exports
export default router;

/*
  em metodo pode conter ate 5 metodos :
 **********************************************
 listar  -> index <- GET
 cria um novo usuario -> store/create <- POST
 apagar um usuario -> delete <- DELETE
 mostra um usuario -> show <- GET
 atualiza  um usuario -> update <- PATH ou PUT

*/
