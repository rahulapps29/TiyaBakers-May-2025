import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all addresses for a user
// @route   GET /api/users/:userId/addresses
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    res.json(user.addresses || []);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add new address for a user
// @route   POST /api/users/:userId/addresses
// @access  Private

// @desc    Add new address for a user
// @route   POST /api/address/:userId/address
// @access  Private
const addUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { fullName, address, city, postalCode, country, phone } = req.body;

  if (!address || !city || !postalCode || !country) {
    res.status(400);
    throw new Error('Required address fields are missing');
  }

  const newAddress = { fullName, address, city, postalCode, country, phone };
  user.addresses.push(newAddress);

  await user.save();
  res.status(201).json(user.addresses);
});

// @desc    Delete an address by ID
// @route   DELETE /api/users/:userId/addresses/:addressId
// @access  Private
const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );
    await user.save();
    res.json(user.addresses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update an address
// @route   PUT /api/users/:userId/addresses/:addressId
// @access  Private
const updateUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const index = user.addresses.findIndex(
      (addr) => addr._id.toString() === req.params.addressId
    );

    if (index !== -1) {
      user.addresses[index] = { ...user.addresses[index]._doc, ...req.body };
      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404);
      throw new Error('Address not found');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
};
