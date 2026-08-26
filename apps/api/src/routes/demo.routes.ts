import { Router } from 'express';
import { z } from 'zod';
import { createDemoSession, getDemoSession, saveDemoCustomization } from '../controllers/demo.controller';

const router = Router();

// Zod schemas
const createDemoSessionSchema = z.object({
  body: z.object({
    templateId: z.string({
      required_error: 'templateId là bắt buộc',
    }),
  }),
});

const saveDemoCustomizationSchema = z.object({
  body: z.object({
    customData: z.record(z.any()).optional(),
  }),
});

// Middleware for validation
const validate = (schema: z.AnyZodObject) => (req: any, res: any, next: any) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.errors[0]?.message || 'Dữ liệu không hợp lệ',
      },
    });
  }
};

router.post('/sessions', validate(createDemoSessionSchema), createDemoSession);
router.get('/sessions/:token', getDemoSession);
router.put('/sessions/:token/save', validate(saveDemoCustomizationSchema), saveDemoCustomization);

export default router;
