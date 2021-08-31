import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

// create new booking => api/bookings
const newBooking = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse, next: any) => {
    const {
      room,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid,
      paymentInfo,
    } = req.body;

    const booking = await Booking.create({
      room,
      user: req.user._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid,
      paymentInfo,
      paidAt: Date.now(),
    });

    res.status(200).json({
      success: true,
      booking,
    });
  }
);

// check room booking availability => api/bookings/check
const checkRoomBookingsAvailability = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse, next: any) => {
    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
      room: roomId,
      $and: [
        {
          checkInDate: { $lte: checkOutDate }, // checkInDate_db <= checkOutDate
          checkOutDate: { $gte: checkInDate }, // checkOutDate_db >= checkInDate
        },
      ],
    });

    let isAvailability = false;

    if (bookings && bookings.length === 0) {
      isAvailability = true;
    }

    res.status(200).json({
      success: true,
      isAvailability,
    });
  }
);

// check booked dates of room => api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse, next: any) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({ room: roomId });

    let bookedDates: any[] = [];

    // get time locale, ex: vn +7
    const timeDifference = moment().utcOffset() / 60; // it given minute, not second

    bookings.forEach((booking) => {
      const checkInDate = moment(booking.checkInDate).add(
        timeDifference,
        "hours"
      );
      const checkOutDate = moment(booking.checkOutDate).add(
        timeDifference,
        "hours"
      );

      const range = moment.range(moment(checkInDate), moment(checkOutDate));

      const dates = Array.from(range.by("day"));
      bookedDates = bookedDates.concat(dates);
    });

    res.status(200).json({
      success: true,
      bookedDates,
    });
  }
);

// get all bookings - admin => api/admin/bookings
const allAdminBookings = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse) => {
    const bookings = await Booking.find()
      .populate({
        path: "room",
        select: "name pricePerNight images",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    res.status(200).json({
      success: true,
      bookings,
    });
  }
);

// delete booking - admin => api/admin/bookings
const deleteBooking = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const booking = await Booking.findById(req.query.id);

    if (!booking) {
      return next(new ErrorHandler("Booking not found with this ID", 400));
    }

    await booking.remove();

    res.status(200).json({
      success: true,
    });
  }
);

// get all bookings of current user => api/bookings/me
const myBookings = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse, next: any) => {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "room",
        select: "name pricePerNight images",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    res.status(200).json({
      success: true,
      bookings,
    });
  }
);

// get booking details => api/bookings/:id
const getBookingDetails = catchAsyncErrors(
  async (req: NextApiRequest | any, res: NextApiResponse, next: any) => {
    const booking = await Booking.findById(req.query.id)
      .populate({
        path: "room",
        select: "name pricePerNight images",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    res.status(200).json({
      success: true,
      booking,
    });
  }
);

export {
  newBooking,
  checkRoomBookingsAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBooking,
};
