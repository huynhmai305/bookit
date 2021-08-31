import { getSession } from "next-auth/client";
import React from "react";
import AllRooms from "../../../components/admin/AllRooms";
import Layout from "../../../components/layout/Layout";

const AllRoomsPage: React.FC = () => {
  return (
    <Layout title="All Rooms">
      <AllRooms />
    </Layout>
  );
};

export default AllRoomsPage;

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
