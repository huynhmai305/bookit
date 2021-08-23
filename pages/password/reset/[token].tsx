import React from "react";
import Layout from "../../../components/layout/Layout";
import NewPassword from "../../../components/user/NewPassword";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return (
    <Layout title="New Password">
      <NewPassword />
    </Layout>
  );
};

export default ForgotPassword;
