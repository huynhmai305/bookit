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

export default Register;
