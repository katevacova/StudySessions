import { Router } from 'express';
import {
  addBan,
  updateBan,
  deleteBan, getBanByUserId,
} from '../ban/controller';
import auth from '../auth/middleware';

const router = Router();

router.get('/user/:id', auth(true), getBanByUserId);
router.post('/', auth(true), addBan);
router.put('/:id', auth(true), updateBan);
router.delete('/:id', auth(true), deleteBan);

export default router;
