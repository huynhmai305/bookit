import { getSession } from "next-auth/client";
import React from "react";
import LoginComponent from "../components/auth/Login";
import Layout from "../components/layout/Layout";

const Login: React.FC = () => {
  return (
    <Layout title="Login">
      <LoginComponent />
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

export default Login;
