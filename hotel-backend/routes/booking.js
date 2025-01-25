const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const router = express.Router();

// Middleware for token verification
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the "Authorization" header
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the user details to the request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Book a hotel (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  const { hotelId, bookingDate } = req.body; // Only hotelId and bookingDate are required

  try {
    const existingBooking = await Booking.findOne({ hotel: hotelId, bookingDate });
    if (existingBooking) {
      return res.status(400).json({ error: 'Hotel already booked for this date' });
    }

    // Automatically associate booking with the authenticated user
    const booking = new Booking({
      user: req.user.id, // Extracted from the token
      hotel: hotelId,
      bookingDate,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Error during booking:', error.message);
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get booking history for a user (requires authentication)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booking history:', error.message);
    res.status(500).json({ error: 'Failed to fetch booking history' });
  }
});

module.exports = router;
