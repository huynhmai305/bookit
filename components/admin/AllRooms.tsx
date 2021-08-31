import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteRoom,
  getAdminRooms,
} from "../../redux/actions/roomActions";
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants";
import { RootState } from "../../redux/store";
import Loader from "../layout/Loader";

interface AllRoomsProps {}

const AllRooms: React.FC<AllRoomsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { rooms, loading, error } = useSelector(
    (state: RootState) => state.allRooms
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state: RootState) => state.room
  );

  const setRooms = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Room ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price / Night",
          field: "price",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    rooms &&
      rooms.forEach((room: any) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a href="" className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteRoomHandler(room._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteRoomHandler = (id: any) => {
    dispatch(deleteRoom(id));
  };

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/rooms");
      dispatch({ type: DELETE_ROOM_RESET });
    }
  }, [deleteError, dispatch, error, isDeleted, router]);

  return (
    <div className="container container-fluid">
      {loading && <Loader />}
      {!loading && (
        <>
          <h1 className="my-5">
            {rooms && rooms.length} Rooms{" "}
            <Link href={`/admin/rooms/new`}>
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create Room
              </a>
            </Link>
          </h1>

          <MDBDataTable
            data={setRooms()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllRooms;
