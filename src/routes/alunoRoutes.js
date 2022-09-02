import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoController.index);
router.get('/:id', alunoController.show);

router.post('/', loginRequired, alunoController.store);
router.put('/:id', loginRequired, alunoController.update);
router.delete('/:id', loginRequired, alunoController.delete);

export default router;

/*
  index -> lista todos os alunos -> GET
  store/create -> cria um novo aluno -> POST
  delete/destroy -> apaga um aluno -> DELETE
  show -> mostra um aluno -> GET
  update -> atualizar um aluno -> PATCH / PUT
*/
