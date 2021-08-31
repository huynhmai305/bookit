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
  ADMIN_BOOKINGS_REQUEST,
  ADMIN_BOOKINGS_SUCCESS,
  ADMIN_BOOKINGS_FAIL,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_RESET,
  DELETE_BOOKING_SUCCESS,
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

// get bookings of current user or all
export const bookingsReducer = (
  state = { bookings: [] },
  action: AnyAction
) => {
  switch (action.type) {
    case ADMIN_BOOKINGS_REQUEST:
      return {
        loading: true,
      };
    case MY_BOOKINGS_SUCCESS:
    case ADMIN_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case MY_BOOKINGS_FAIL:
    case ADMIN_BOOKINGS_FAIL:
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

// delete booking
export const bookingReducer = (
  state: Booking = initBooking,
  action: AnyAction
) => {
  switch (action.type) {
    case DELETE_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case DELETE_BOOKING_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_BOOKING_RESET:
      return {
        loading: false,
        isDeleted: false,
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
