import { getSession } from "next-auth/client";
import React from "react";
import UpdateRoom from "../../../components/admin/UpdateRoom";
import Layout from "../../../components/layout/Layout";

interface UpdateRoomPageProps {}

const UpdateRoomPage: React.FC<UpdateRoomPageProps> = () => {
  return (
    <Layout title="Update Room">
      <UpdateRoom />
    </Layout>
  );
};

export default UpdateRoomPage;

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
