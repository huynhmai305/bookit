import React from "react";

interface UpdateUserProps {}

const UpdateUser: React.FC<UpdateUserProps> = () => {
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mt-2 mb-5">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role</label>

              <select
                id="role_field"
                className="form-control"
                name="role"
                value=""
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
