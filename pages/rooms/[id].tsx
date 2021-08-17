import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/layout/Layout";
import RoomDetails from "../../components/room/RoomDetails";
import { getRoomDetails } from "../../redux/actions/roomActions";
import { wrapper } from "../../redux/store";

const RoomDetailsPage: React.FC = () => {
  return (
    <Layout title="Room Details">
      <RoomDetails />
    </Layout>
  );
};

export default RoomDetailsPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async ({ req, params }): Promise<any> => {
        await store.dispatch(getRoomDetails(req, params?.id));
      }
  );
