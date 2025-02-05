import { Router } from 'express';
import {
  deleteUser,
  getSelf,
  getAll,
} from '../user/controller';
import auth from '../auth/middleware';

const router = Router();

router.get('/self', auth(false), getSelf);
router.get('/all', auth(true), getAll);
router.delete('/:id', auth(false), deleteUser);

export default router;
