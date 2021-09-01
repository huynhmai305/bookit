import { MDBDataTable } from "mdbreact";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteReviews,
  getRoomReviews,
} from "../../redux/actions/roomActions";
import { DELETE_REVIEW_RESET } from "../../redux/constants/roomConstants";
import { RootState } from "../../redux/store";

interface RoomReviewsProps {}

const RoomReviews: React.FC<RoomReviewsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const { reviews, loading, error } = useSelector(
    (state: RootState) => state.roomReviews
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state: RootState) => state.review
  );

  const setReviews = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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
    reviews &&
      reviews.forEach((review: any) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteReviewHandler(review._id, roomId)}
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
  };

  const deleteReviewHandler = (id: any, roomId: any) => {
    dispatch(deleteReviews(id, roomId));
  };

  useEffect(() => {
    if (roomId !== "") {
      dispatch(getRoomReviews(roomId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review is deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [deleteError, dispatch, error, isDeleted, roomId, router]);

  return (
    <div className="container container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-5">
          <form action="">
            <div className="form-group">
              <label htmlFor="">Enter Room ID</label>
              <input
                type="text"
                className="form-control"
                id="roomId_field"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      {reviews && reviews.length > 0 ? (
        <>
          <h1 className="my-5">{reviews && reviews.length} Reviews </h1>

          <MDBDataTable
            data={setReviews()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <div className="alert alert-danger mt-5 text-center">No Reviews</div>
      )}
    </div>
  );
};

export default RoomReviews;
