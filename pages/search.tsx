import React from "react";
import Layout from "../components/layout/Layout";
import Search from "../components/Search";

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <Layout title="Search Rooms">
      <Search />
    </Layout>
  );
};

export default SearchPage;
