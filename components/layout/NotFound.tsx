import Link from "next/link";
import React from "react";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="page-not-found-wrapper">
      <h1 id="title_404">404!</h1>
      <h3 id="description_404">
        Page Not Found. Go to <Link href="/">Homepage</Link>
      </h3>
    </div>
  );
};

export default NotFound;
