import Link from "next/link";
import Image from "next/image";
import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
      <Link href="#">
        <a className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i>
          Back to Search
        </a>
      </Link>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-2">
            <Image
              src="/images/bookit_logo.png"
              alt=""
              className="card-img-top mx-auto"
              width={300}
              height={300}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link href="#">
                  <a>Charming Studio 10 Miles to Well Beaches</a>
                </Link>
              </h5>
              <div className="ratings mt-auto mb-3">
                <p className="card-text">
                  <b>$12</b> / night
                </p>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 reviews)</span>
              </div>
              <button className="btn btn-lock view-btn">
                <Link href="#">
                  <a>View details</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card py-2">
            <Image
              src="/images/bookit_logo.png"
              alt=""
              className="card-img-top mx-auto"
              width={300}
              height={300}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link href="#">
                  <a>Picturesque 2-Story Farmhouse w/Private Hot Tub</a>
                </Link>
              </h5>
              <div className="ratings mt-auto mb-3">
                <p className="card-text">
                  <b>$12</b> / night
                </p>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 reviews)</span>
              </div>
              <button className="btn btn-lock view-btn">
                <Link href="#">
                  <a>View details</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
