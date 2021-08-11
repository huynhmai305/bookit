import React from "react";

interface NewReviewProps {}

const NewReview: React.FC<NewReviewProps> = () => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4 mb-5"
          data-toggle="modal"
          data-target="#ratingModal"
        >
          Submit Your Review
        </button>

        <div
          className="modal fade"
          id="ratingModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="ratingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ratingModalLabel">
                  Submit Review
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="stars">
                  <li className="star">
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star">
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star">
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star">
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star">
                    <i className="fa fa-star"></i>
                  </li>
                </ul>

                <textarea
                  name="review"
                  id="review"
                  className="form-control mt-3"
                  value=""
                >
                  {" "}
                </textarea>

                <button
                  className="btn my-3 float-right review-btn px-4 text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
