import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';

const router = Router();

// Chatbot RAG BĐS 24/7
router.post('/chat', AiController.chat);

// Đồng bộ lịch sử chat từ khách vãng lai khi đăng ký / đăng nhập
router.post('/sync-guest-history', AiController.syncGuestHistory);

// Lấy lịch sử chat chi tiết
router.get('/history', AiController.getHistory);

// Kiểm tra giới hạn lượt dùng theo IP
router.get('/usage', AiController.getUsage);

export default router;
