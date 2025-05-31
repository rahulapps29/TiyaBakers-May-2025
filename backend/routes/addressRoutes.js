import express from 'express';
const router = express.Router();
import {
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

// Address Routes
router
  .route('/:userId/address')
  .get(protect, getUserAddresses)
  .post(protect, addUserAddress);

router
  .route('/:userId/address/:addressId')
  .delete(protect, deleteUserAddress)
  .put(protect, updateUserAddress);

export default router;
