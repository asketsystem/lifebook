import { Router } from 'express';
import {
  generateDailyContent,
  getDailyContent,
  generateMeditation,
  generatePrayer
} from '../controllers/contentController';
import { verifyFirebaseToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(verifyFirebaseToken);

// Generate complete daily content package
router.post('/daily', generateDailyContent);

// Get daily content for a specific date
router.get('/daily', getDailyContent);

// Generate meditation script
router.post('/meditation', generateMeditation);

// Generate prayer
router.post('/prayer', generatePrayer);

export default router; 