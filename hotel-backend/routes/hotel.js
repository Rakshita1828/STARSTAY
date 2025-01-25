const express = require('express');
const Hotel = require('../models/Hotel'); // Ensure the path to the model is correct
const Booking = require('../models/Booking'); // Ensure the path to the model is correct
const router = express.Router();

// Add a new hotel
router.post('/', async (req, res) => {
  const { name, location, pricePerNight } = req.body;

  try {
    // Check if a hotel with the same name and location already exists
    const existingHotel = await Hotel.findOne({ name, location });
    if (existingHotel) {
      return res.status(409).json({ error: 'Hotel with the same name and location already exists' });
    }

    // Create and save the new hotel
    const hotel = new Hotel({ name, location, pricePerNight });
    await hotel.save();
    res.status(201).json({ message: 'Hotel added successfully!', hotel });
  } catch (error) {
    console.error('Error adding hotel:', error.message);
    res.status(500).json({ error: 'Failed to add hotel' });
  }
});

// Get available hotels for a particular date
router.get('/', async (req, res) => {
  const { date } = req.query; // Expecting date to be passed as a query parameter

  try {
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    // Get the hotels that have already been booked for the selected date
    const bookedHotels = await Booking.find({ bookingDate: date }).populate('hotel');  // Populate to get full hotel details

    // Extract hotel IDs of the already booked hotels
    const bookedHotelIds = bookedHotels.map((booking) => booking.hotel._id);

    // Find hotels that are NOT booked on the selected date
    const availableHotels = await Hotel.find({
      _id: { $nin: bookedHotelIds }, // Exclude booked hotels
    });

    res.status(200).json(availableHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ error: 'Failed to fetch available hotels' });
  }
});

module.exports = router;
