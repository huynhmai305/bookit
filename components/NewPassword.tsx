import React from "react";

interface NewPasswordProps {}

const NewPassword: React.FC<NewPasswordProps> = () => {
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg">
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value=""
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
