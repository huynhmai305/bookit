import easyinvoice from "easyinvoice";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";
import { RootState } from "../../redux/store";

interface MyBookingsProps {}

const MyBookings: React.FC<MyBookingsProps> = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state: RootState) => state.bookings);

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
              <Link href={`/bookings/${booking._id}`}>
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
            </>
          ),
        });
      });

    return data;
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
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
