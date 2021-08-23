import React from "react";
import Layout from "../../components/layout/Layout";
import ForgotPasswordComponent from "../../components/user/ForgotPassword";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return (
    <Layout title="Forgot Password">
      <ForgotPasswordComponent />
    </Layout>
  );
};

export default ForgotPassword;
