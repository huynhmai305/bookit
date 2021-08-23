import { getSession } from "next-auth/client";
import React from "react";
import RegisterComponent from "../components/auth/Register";
import Layout from "../components/layout/Layout";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  return (
    <Layout title="Register">
      <RegisterComponent />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  // protect route if login yet
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
