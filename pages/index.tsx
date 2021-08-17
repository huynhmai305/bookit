import React from "react";
import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import { wrapper } from "../redux/store";
import { getRooms } from "../redux/actions/roomActions";
import { GetServerSideProps } from "next";

const Index: React.FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async ({ req, query }): Promise<any> => {
        await store.dispatch(
          getRooms(
            req,
            query.page,
            query.location,
            query.guests,
            query.category
          )
        );
      }
  );
