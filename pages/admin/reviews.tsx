import { getSession } from "next-auth/client";
import React from "react";
import RoomReviews from "../../components/admin/RoomReviews";
import Layout from "../../components/layout/Layout";

const RoomReviewsPage: React.FC = () => {
  return (
    <Layout title="Room Reviews">
      <RoomReviews />
    </Layout>
  );
};

export default RoomReviewsPage;

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
