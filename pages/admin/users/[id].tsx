import { getSession } from "next-auth/client";
import React from "react";
import UpdateUser from "../../../components/admin/UpdateUser";
import Layout from "../../../components/layout/Layout";

interface UpdateUserPageProps {}

const UpdateUserPage: React.FC<UpdateUserPageProps> = () => {
  return (
    <Layout title="Update User">
      <UpdateUser />
    </Layout>
  );
};

export default UpdateUserPage;

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
