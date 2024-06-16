import { Router } from 'express';
import { authorize, token, introspect, register, publicKey } from '../controllers/authController';

const router = Router();

router.get('/authorize', authorize);
router.post('/token', token);
router.post('/introspect', introspect);
router.post('/register', register);
router.get('/publicKey', publicKey);

export default router;