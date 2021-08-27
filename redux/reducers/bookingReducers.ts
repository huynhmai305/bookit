import { AnyAction } from "redux";
import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/bookingConstants";

export interface Booking {
  available?: boolean | null;
  loading: boolean;
  dates?: any[];
  bookings?: any[];
  error?: any;
  booking?: object;
}

const initBooking = {
  available: null,
  loading: false,
  dates: [],
  bookings: [],
  booking: {},
};

// check booking
export const checkBookingReducer = (
  state: Booking = initBooking,
  action: AnyAction
) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };
    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get all booked dates
export const bookedDatesReducer = (
  state: Booking = initBooking,
  action: AnyAction
) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };
    case BOOKED_DATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get bookings of current user
export const bookingsReducer = (
  state: Booking = initBooking,
  action: AnyAction
) => {
  switch (action.type) {
    case MY_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case MY_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// get booking details
export const bookingDetailsReducer = (
  state: Booking = initBooking,
  action: AnyAction
) => {
  switch (action.type) {
    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };
    case BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
