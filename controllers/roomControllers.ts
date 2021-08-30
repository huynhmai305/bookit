import { NextApiRequest, NextApiResponse } from "next";
import Room from "../models/room";
import Booking from "../models/booking";
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

// => POST /api/reviews
const createRoomReview = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: (arg: ErrorHandler) => any) => {
    const { rating, comment, roomId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const room = await Room.findById(roomId);

    const isReviewed = room.reviews.find(
      (r: any) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      room.reviews.forEach((review: any) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      room.reviews.push(review);
      room.numOfReviews = room.reviews.length;
    }

    room.ratings =
      room.reviews.reduce((total: any, item: any) => total + item.rating, 0) /
      room.reviews.length;

    await room.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  }
);

// => GET /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: (arg: ErrorHandler) => any) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, room: roomId });

    let isReviewAvailability = false;
    if (bookings.length > 0) isReviewAvailability = true;

    res.status(200).json({
      success: true,
      isReviewAvailability,
    });
  }
);

export {
  allRooms,
  addRoom,
  singleRoom,
  updateRoom,
  deleteRoom,
  createRoomReview,
  checkReviewAvailability,
};
