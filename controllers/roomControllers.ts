import { NextApiRequest, NextApiResponse } from "next";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// => GET /api/rooms
const allRooms = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
      .search()
      .filter();

    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query;

    res.status(200).json({
      success: true,
      roomsCount,
      resPerPage,
      filteredRoomsCount,
      rooms,
    });
  }
);

// => POST /api/rooms
const addRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.create(req.body);

    res.status(200).json({
      success: true,
      room,
    });
  }
);

// => GET /api/rooms/:id
const singleRoom = catchAsyncErrors(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (arg: ErrorHandler) => any
  ) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      room,
    });
  }
);

// => PUT /api/rooms/:id
const updateRoom = catchAsyncErrors(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (arg: ErrorHandler) => any
  ) => {
    let room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      room,
    });
  }
);

// => DELETE /api/rooms/:id
const deleteRoom = catchAsyncErrors(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (arg: ErrorHandler) => any
  ) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    await room.remmove();

    res.status(200).json({
      success: true,
      message: "Room is deleted",
    });
  }
);

export { allRooms, addRoom, singleRoom, updateRoom, deleteRoom };
