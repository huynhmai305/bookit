import { getSession } from "next-auth/client";
import React from "react";
import Layout from "../../components/layout/Layout";
import Profile from "../../components/user/Profile";

interface UpdateProfileProps {}

const UpdateProfile: React.FC<UpdateProfileProps> = () => {
  return (
    <Layout title="Profile">
      <Profile />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  // protect route if login yet
  if (!session) {
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

export default UpdateProfile;
