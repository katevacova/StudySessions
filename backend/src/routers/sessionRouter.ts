import { Router } from 'express';
import {
  getAll,
  getAllPast,
  addSession,
  getSessionById,
  updateSession,
  deleteSession,
} from '../session/controller';
import auth from '../auth/middleware';

const router = Router();

router.get('/all', auth(false), getAll);
router.get('/history', auth(false), getAllPast);
router.post('/', auth(false), addSession);
router.get('/:id', auth(false), getSessionById);
router.put('/:id', auth(false), updateSession);
router.delete('/:id', auth(false), deleteSession);

export default router;
