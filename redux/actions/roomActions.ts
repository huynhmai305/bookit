import axios from "axios";
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from "../constants/roomConstants";
import absoluteUrl from "next-absolute-url";

export const getRooms =
  (
    req: any,
    currentPage: any = 1,
    location: any = "",
    guests: any,
    category: any
  ) =>
  async (dispatch: any) => {
    try {
      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoomDetails = (req: any, id: any) => async (dispatch: any) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
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
