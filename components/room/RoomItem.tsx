import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RoomItemProps {
  room: any;
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <Image
          src={room.images[0].url}
          alt={room.name}
          className="card-img-top mx-auto"
          height={300}
          width={400}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/rooms/${room._id}`}>
              <a>{room.name}</a>
            </Link>
          </h5>
          <div className="ratings mt-auto mb-3">
            <p className="card-text">
              <b>${room.pricePerNight}</b> / night
            </p>
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(room.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({room.numOfReviews} reviews)</span>
          </div>
          <button className="btn btn-lock view-btn">
            <Link href={`/rooms/${room._id}`}>
              <a>View details</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
