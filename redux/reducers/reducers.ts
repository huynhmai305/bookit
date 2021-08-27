import { combineReducers } from "redux";
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingsReducer,
  checkBookingReducer,
} from "./bookingReducers";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userReducer,
} from "./userReducers";

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
});

export default reducers;
