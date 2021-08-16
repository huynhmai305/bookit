import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import { RootState } from "../redux/store";
import RoomItem from "./room/RoomItem";

const Home: React.FC = () => {
  const { rooms, error } = useSelector((state: RootState) => state.allRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error]);

  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
      <Link href="/">
        <a className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
      </Link>
      <div className="row">
        {rooms && rooms.length === 0 && (
          <div className="alert alert-danger my-3">
            <b>No Rooms</b>
          </div>
        )}
        {rooms &&
          rooms.length !== 0 &&
          rooms.map((room: any) => <RoomItem room={room} key={room._id} />)}
      </div>
    </section>
  );
};

export default Home;
