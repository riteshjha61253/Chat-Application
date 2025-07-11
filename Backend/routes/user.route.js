import express from 'express';
import { allUsers, signIn, signOut, signUp } from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/signIn',signIn);
router.post('/signOut',signOut);
router.get('/allUsers',secureRoute,allUsers);
export default router;
