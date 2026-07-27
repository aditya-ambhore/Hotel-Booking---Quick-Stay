import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import uploadToCloudinary from "../helpers/uploadToCloudinary.js";

export const getDashboard = async (req, res) => {
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

    const hotel = await Hotel.findOne({
      owner: user._id,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const bookings = await Booking.find({
      hotel: hotel._id,
    })
      .populate("user")
      .populate("room")
      .populate("hotel");

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    res.json({
      success: true,
      dashboard: {
        totalBookings,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOwnerRooms = async (req, res) => {
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

    const hotel = await Hotel.findOne({
      owner: user._id,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const rooms = await Room.find({
      hotel: hotel._id,
    }).populate("hotel");

    res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await Hotel.findByIdAndUpdate(room.hotel, {
      $pull: {
        rooms: room._id,
      },
    });

    await Room.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    room.roomType = req.body.roomType;
    room.pricePerNight = req.body.pricePerNight;
    room.isAvailable = req.body.isAvailable;

    await room.save();

    res.json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addRoom = async (req, res) => {
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

    const { hotel, roomType, pricePerNight, amenities, isAvailable } = req.body;

    console.log("Hotel ID:", hotel);

    const hotelDoc = await Hotel.findById(hotel);

    if (!hotelDoc) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    console.log("Selected Hotel:", hotelDoc._id);

    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "hotel-booking/rooms",
        );

        images.push(uploaded.secure_url);
      }
    }

    const room = await Room.create({
      hotel: hotelDoc._id,
      roomType,
      pricePerNight,
      amenities: amenities ? JSON.parse(amenities) : [],
      isAvailable,
      images,
    });

    console.log("Created Room:", room._id);

    await Hotel.findByIdAndUpdate(
      hotelDoc._id,
      {
        $push: {
          rooms: room._id,
        },
      },
      { new: true },
    );

    const updatedHotel = await Hotel.findById(hotelDoc._id);

    console.log("Updated Hotel Rooms:", updatedHotel.rooms);

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room,
    });
  } catch (error) {
    console.log("========== ADD ROOM ERROR ==========");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addHotel = async (req, res) => {
  try {
    console.log("===== ADD HOTEL =====");

    console.log("UserId:", req.userId);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const user = await User.findOne({
      clerkId: req.userId,
    });

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    console.log("Uploading image...");

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      "hotel-booking/hotels",
    );

    console.log("Uploaded:", uploaded);

    const hotel = await Hotel.create({
      owner: user._id,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      contact: req.body.contact,
      description: req.body.description,
      image: uploaded.secure_url,
    });

    console.log("Hotel Saved:", hotel);

    return res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel,
    });
  } catch (error) {
    console.log("========== ERROR ==========");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOwnerBookings = async (req, res) => {
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

    const hotel = await Hotel.findOne({
      owner: user._id,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const bookings = await Booking.find({
      hotel: hotel._id,
    })
      .populate("user")
      .populate("room")
      .sort({ createdAt: -1 });

    res.json({
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
