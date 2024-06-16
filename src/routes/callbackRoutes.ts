import { Router } from 'express';
import { callback } from '../controllers/callbackController';

const router = Router();

router.get('/callback', callback);

export default router;