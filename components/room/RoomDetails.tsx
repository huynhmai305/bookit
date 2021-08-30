import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/roomActions";
import Head from "next/head";
import { Carousel } from "react-bootstrap";
import RoomFeatures from "./RoomFeatures";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import axios from "axios";
import {
  checkBooking,
  getBookedDates,
} from "../../redux/actions/bookingActions";
import { PayPalButton } from "react-paypal-button-v2";
import ButtonLoader from "../layout/ButtonLoader";
import NewReview from "../review/NewReview";
import ListReviews from "../review/ListReviews";

const RoomDetails: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.loadedUser);
  const { room, error } = useSelector((state: RootState) => state.roomDetails);
  const { available, loading } = useSelector(
    (state: RootState) => state.checkBooking
  );
  const { dates } = useSelector((state: RootState) => state.bookedDates);
  const [checkInDate, setCheckInDate] = useState<any>();
  const [checkOutDate, setCheckOutDate] = useState<any>();
  const [daysOfStay, setDaysOfStay] = useState<number>(0);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const excludeDates: Date[] = [];
  dates.forEach((date: any) => excludeDates.push(new Date(date)));

  const onChange = (dates: any) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // calc days of stay
      const days = Math.floor(
        (new Date(checkOutDate).valueOf() - new Date(checkInDate).valueOf()) /
          (24 * 60 * 60 * 1000) +
          1
      );

      setDaysOfStay(days);

      dispatch(
        checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      );
    }
  };

  const newBookingHandler = async (
    paymentId: string,
    paymentStatus: string
  ) => {
    const bookingDate = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: room.pricePerNight * daysOfStay,
      paymentInfo: {
        id: paymentId,
        status: paymentStatus,
      },
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/bookings", bookingDate, config);
      if (data.success) {
        await router.push("/bookings/me");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AS94PfwZ6WUpxWRoH4zOqnrH-9f8buA4xeLtLu5azFI2xcYYjksZ6jjFVvRKvrDj4QdAG0ho76Kiyfda`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  useEffect(() => {
    dispatch(getBookedDates(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel pause="hover" slide={false} fade={false}>
          {room.images &&
            room.images.map((image: any) => (
              <Carousel.Item key={image?.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    src={image.url}
                    className="d-block m-auto"
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <div className="price-per-night">
                <b>${room.pricePerNight}</b> / night
                <hr />
                <p className="mt-5 mb-3">Pick Check In and Check Out Date</p>
                <DatePicker
                  className="w-100"
                  selected={checkInDate}
                  onChange={onChange}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  excludeDates={excludeDates}
                  selectsRange
                  inline
                />
              </div>

              {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available. Book now.
                </div>
              )}
              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )}
              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )}
              {/* {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={newBookingHandler}
                >
                  Pay
                </button>
              )} */}
              {available && user && scriptLoaded && (
                <PayPalButton
                  amount={room.pricePerNight * daysOfStay}
                  onSuccess={(details: any, data: any) => {
                    newBookingHandler(details.id, details.status);
                  }}
                  style={{ color: "blue" }}
                />
              )}
            </div>
          </div>
        </div>

        <NewReview />

        {room.reviews && room.reviews.length > 0 ? (
          <ListReviews reviews={room.reviews} />
        ) : (
          <p>
            <b>No reviews on this room</b>
          </p>
        )}
      </div>
    </>
  );
};

export default RoomDetails;
