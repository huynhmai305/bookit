import { combineReducers } from "redux";
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingReducer,
  bookingsReducer,
  checkBookingReducer,
} from "./bookingReducers";
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  reviewReducer,
  roomDetailsReducer,
  roomReducer,
  roomReviewsReducer,
} from "./roomReducers";
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userDetailsReducer,
  userReducer,
} from "./userReducers";

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  allUsers: allUsersReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

export default reducers;
