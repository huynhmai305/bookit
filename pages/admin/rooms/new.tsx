import { getSession } from "next-auth/client";
import React from "react";
import NewRoom from "../../../components/admin/NewRoom";
import Layout from "../../../components/layout/Layout";

const NewRoomPage: React.FC = () => {
  return (
    <Layout title="New Room">
      <NewRoom />
    </Layout>
  );
};

export default NewRoomPage;

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
