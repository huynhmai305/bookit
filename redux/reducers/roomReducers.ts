import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "./../constants/roomConstants";

export interface Room {
  name?: String;
  pricePerNight?: Number;
  description?: String;
  address?: String;
  guestCapacity?: Number;
  numOfBeds?: Number;
  internet?: Boolean;
  breakfast?: Boolean;
  airConditioned?: Boolean;
  petsAllowed?: Boolean;
  roomCleaning?: Boolean;
  ratings?: Number;
  numOfReviews?: Number;
  images?: Array<{ public_id: String; url: String }>;
  category?: String;
  reviews?: Array<any>;
}

export interface Rooms {
  rooms: Room[];
}

const initRoomDetails: Room = {};

const initRooms: Rooms = {
  rooms: [],
};

// All rooms reducer
export const allRoomsReducer = (state: Rooms = initRooms, action: any) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };
    case ALL_ROOMS_FAIL:
      return {
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

// Room details reducer
export const roomDetailsReducer = (
  state: Room = initRoomDetails,
  action: any
) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESS:
      return {
        room: action.payload,
      };
    case ROOM_DETAILS_FAIL:
      return {
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
