import { getSession } from "next-auth/client";
import React from "react";
import MyBookings from "../../components/booking/MyBookings";
import Layout from "../../components/layout/Layout";
import { myBookings } from "../../redux/actions/bookingActions";
import { wrapper } from "../../redux/store";

interface MyBookingsPageProps {}

const MyBookingsPage: React.FC<MyBookingsPageProps> = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }): Promise<any> => {
      const session = await getSession({ req });

      // protect route if login yet
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(myBookings(req.headers.cookie, req));
    }
);

export default MyBookingsPage;
