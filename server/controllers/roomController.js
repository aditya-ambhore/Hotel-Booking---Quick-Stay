import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import uploadToCloudinary from "../helpers/uploadToCloudinary.js";

/* ==========================
   Create Room
========================== */

export const createRoom = async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, isAvailable } = req.body;
    console.log(req.body);
    console.log("Hotel ID:", hotel);
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer);
        imageUrls.push(uploaded.secure_url);
      }
    }

    const room = await Room.create({
      hotel,
      roomType,
      pricePerNight,
      amenities: amenities ? JSON.parse(amenities) : [],
      isAvailable,
      images: imageUrls,
    });

    // Add room to hotel
if (hotel) {
  console.log("Finding hotel:", hotel);

  const hotelDoc = await Hotel.findById(hotel);

  console.log("Hotel Found:", hotelDoc);

  if (!hotelDoc) {
    return res.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }

  hotelDoc.rooms.push(room._id);

  console.log("Rooms Before Save:", hotelDoc.rooms);

  await hotelDoc.save();

  console.log("Hotel Saved");
}

    const updatedHotel = await Hotel.findById(hotel);

    console.log(updatedHotel.rooms);

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get All Rooms
========================== */

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel");

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get Room By ID
========================== */

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
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

/* ==========================
   Update Room
========================== */

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
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

/* ==========================
   Delete Room
========================== */

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Remove room from hotel
    await Hotel.findByIdAndUpdate(room.hotel, {
      $pull: {
        rooms: room._id,
      },
    });

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchRooms = async (req, res) => {
  try {
    const { city, roomType, minPrice, maxPrice } = req.query;

    let query = {};

    if (roomType) {
      query.roomType = roomType;
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {};

      if (minPrice) query.pricePerNight.$gte = Number(minPrice);

      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    let rooms = await Room.find(query).populate("hotel");

    if (city) {
      rooms = rooms.filter((room) =>
        room.hotel.city.toLowerCase().includes(city.toLowerCase()),
      );
    }

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
