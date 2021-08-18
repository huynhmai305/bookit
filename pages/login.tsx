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

export default Login;
