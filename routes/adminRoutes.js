import express from 'express';
import { getAllUsers, getAllTransactions, resetData } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', getAllUsers);
router.get('/transactions', getAllTransactions);
router.post('/reset', resetData);

export default router;
