import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';

const router = Router();

// POST /api/ai/chat
router.post('/chat', AiController.chat);

// GET /api/ai/usage
router.get('/usage', AiController.getUsage);

export default router;
