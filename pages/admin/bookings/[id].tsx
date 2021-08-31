import { getSession } from "next-auth/client";
import React from "react";
import BookingDetails from "../../../components/booking/BookingDetails";
import Layout from "../../../components/layout/Layout";
import { getBookingDetails } from "../../../redux/actions/bookingActions";
import { wrapper } from "../../../redux/store";

interface BookingDetailsPageProps {}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  );
};

export default BookingDetailsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }): Promise<any> => {
      const session: any = await getSession({ req });

      // protect route if login yet
      if (!session || session.user.role !== "admin") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getBookingDetails(req.headers.cookie, req, params?.id)
      );
    }
);
