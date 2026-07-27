import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

/* ==========================
   Create Booking
========================== */

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests } = req.body;

    const room = await Room.findById(roomId).populate("hotel");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (!room.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available",
      });
    }

    const user = await User.findOne({
      clerkId: req.userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const days = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24),
    );

    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking dates",
      });
    }

    const totalPrice = days * room.pricePerNight;

    const booking = await Booking.create({
      user: user._id,
      room: room._id,
      hotel: room.hotel._id,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      isPaid: false,
      status: "Confirmed",
    });

    room.isAvailable = false;
    await room.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get My Bookings
========================== */

export const getMyBookings = async (req, res) => {
  try {
    const user = await User.findOne({
      clerkId: req.userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const bookings = await Booking.find({
      user: user._id,
    })
      .populate("room")
      .populate("hotel");

    console.log(JSON.stringify(bookings, null, 2));

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Cancel Booking
========================== */

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    await Room.findByIdAndUpdate(booking.room, {
      isAvailable: true,
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
