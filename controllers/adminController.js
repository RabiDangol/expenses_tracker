import userModel from '../models/userModel.js';
import transectionModel from '../models/transectionModel.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error });
  }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transectionModel.find();
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch transactions', error });
  }
};

// Reset data - delete all transactions
export const resetData = async (req, res) => {
  try {
    await transectionModel.deleteMany({});
    res.status(200).json({ success: true, message: 'All transactions deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reset data', error });
  }
};
