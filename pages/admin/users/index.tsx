import { getSession } from "next-auth/client";
import React from "react";
import AllUsers from "../../../components/admin/AllUsers";
import Layout from "../../../components/layout/Layout";

interface AllUsersPageProps {}

const AllUsersPage: React.FC<AllUsersPageProps> = () => {
  return (
    <Layout title="All Users">
      <AllUsers />
    </Layout>
  );
};

export default AllUsersPage;

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
