import { NextApiRequest, NextApiResponse } from "next";
import Room from "../models/room";
import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

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
const addRoom = catchAsyncErrors(async (req: any, res: NextApiResponse) => {
  const images = req.body.images;

  let imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "bookit/rooms",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user._id;

  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

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

    if (req.body.images) {
      // delete images associated with the room
      for (let i = 0; i < room.images.length; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id);
      }

      const images = req.body.images;

      let imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "bookit/rooms",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLink;
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

    // delete images associated with the room
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id);
    }

    await room.remove();

    res.status(200).json({
      success: true,
      message: "Room is deleted",
    });
  }
);

// => POST /api/reviews
const createRoomReview = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
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
  async (req: any, res: NextApiResponse) => {
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

// => GET /api/admin/rooms
const allAdminRooms = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      rooms,
    });
  }
);

// => GET /api/reviews?id=:id
const getRoomReviews = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const room = await Room.findById(req.query.id);

    res.status(200).json({
      success: true,
      reviews: room.reviews,
    });
  }
);

// => DELETE /api/reviews?roomId=:id
const deleteReviews = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const room = await Room.findById(req.query.roomId);

    const reviews = room.reviews.filter(
      (review: any) => review._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;
    const ratings =
      room.reviews.reduce((total: any, item: any) => total + item.rating, 0) /
      numOfReviews;

    await Room.findByIdAndUpdate(
      req.query.roomId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
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
  allAdminRooms,
  getRoomReviews,
  deleteReviews,
};
