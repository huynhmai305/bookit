import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { Dispatch } from "redux";
import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS,
} from "../constants/bookingConstants";

export const checkBooking =
  (roomId: any, checkInDate: any, checkOutDate: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST });

      let url = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
      const { data } = await axios.get(url);

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailability,
      });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getBookedDates = (roomId: any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/bookings/check_booked_dates?roomId=${roomId}`
    );

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myBookings =
  (authCookie: any, req: any) => async (dispatch: Dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = {
        headers: {
          cookie: authCookie,
        },
      };

      const { data } = await axios.get(`${origin}/api/bookings/me`, config);

      dispatch({
        type: MY_BOOKINGS_SUCCESS,
        payload: data.bookings,
      });
    } catch (error) {
      dispatch({
        type: MY_BOOKINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getBookingDetails =
  (authCookie: any, req: any, id: any) => async (dispatch: Dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = {
        headers: {
          cookie: authCookie,
        },
      };

      const { data } = await axios.get(`${origin}/api/bookings/${id}`, config);

      dispatch({
        type: BOOKING_DETAILS_SUCCESS,
        payload: data.booking,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clear Error
export const clearErrors = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
