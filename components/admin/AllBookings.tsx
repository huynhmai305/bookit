import easyinvoice from "easyinvoice";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteBooking,
  getAdminBookings,
} from "../../redux/actions/bookingActions";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";
import { RootState } from "../../redux/store";
import Loader from "../layout/Loader";

interface AllBookingsProps {}

const AllBookings: React.FC<AllBookingsProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bookings, error, loading } = useSelector(
    (state: RootState) => state.bookings
  );
  const { isDeleted, error: deleteBookingError } = useSelector(
    (state: RootState) => state.booking
  );

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amount",
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
    bookings &&
      bookings.forEach((booking: any) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/admin/bookings/${booking._id}`}>
                <a href="" className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>
              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteBookingHandler(booking._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteBookingHandler = (id: any) => {
    dispatch(deleteBooking(id));
  };

  const downloadInvoice = async (booking: any) => {
    const data = {
      documentTitle: "Booking INVOICE", //Defaults to INVOICE
      currency: "USD",
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://res.cloudinary.com/mai-bookit/image/upload/v1629883845/bookit/avatars/bookit_logo_ntzqwd.png",
      background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
      sender: {
        company: "Book IT",
        address: "117/2, 16 Street",
        zip: "700000",
        city: "Thu Duc",
        country: "Ho Chi Minh",
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check Out: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.pricePerNight,
        },
      ],
    };
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteBookingError) {
      toast.error(deleteBookingError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [deleteBookingError, dispatch, error, isDeleted, router]);

  return (
    <div className="container container-fluid">
      {loading && <Loader />}
      {!loading && (
        <>
          <h1 className="my-5">{bookings && bookings.length} Bookings</h1>
          <MDBDataTable
            data={setBookings()}
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

export default AllBookings;
