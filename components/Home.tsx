import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import { RootState } from "../redux/store";
import RoomItem from "./room/RoomItem";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
    useSelector((state: RootState) => state.allRooms);

  const dispatch = useDispatch();
  const router = useRouter();
  let { location, page = 1 } = router.query;
  page = Number(page);

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  const handlePagination = (pageNumber: Number) => {
    router.push(`/?page=${pageNumber}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error]);

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : "All Rooms"}
        </h2>
        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 && (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms</b>
            </div>
          )}
          {rooms &&
            rooms.length !== 0 &&
            rooms.map((room: any) => <RoomItem room={room} key={room._id} />)}
        </div>
      </section>

      {/* Record not full 1 page => not show pagination */}
      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
