import { getSession } from "next-auth/client";
import React from "react";
import AllBookings from "../../../components/admin/AllBookings";
import Layout from "../../../components/layout/Layout";

interface AllBookingsPageProps {}

const AllBookingsPage: React.FC<AllBookingsPageProps> = () => {
  return (
    <Layout title="All Bookings">
      <AllBookings />
    </Layout>
  );
};

export default AllBookingsPage;

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession({ req: context.req });

  // protect route if login yet or role is not admin
  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
