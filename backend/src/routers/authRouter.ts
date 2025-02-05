import { Router } from 'express';
import { loginUser, registerUser, logout } from '../auth/controller';

const authRouter = Router();

authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/logout', logout);

export default authRouter;
