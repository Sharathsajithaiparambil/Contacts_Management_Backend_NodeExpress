import express, { Router } from 'express';
import { registerUser, loginUser, currentUser } from '../controllers/userController';
import validateToken from '../middleware/validateTokenHandler';

const router: Router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/current').get(validateToken, currentUser);

export default router;

