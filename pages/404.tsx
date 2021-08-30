import React from "react";
import Layout from "../components/layout/Layout";
import NotFound from "../components/layout/NotFound";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Layout title="Page ot Found">
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;
