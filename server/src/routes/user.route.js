import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

export default router;