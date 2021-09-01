import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userActions";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import { RootState } from "../../redux/store";
import ButtonLoader from "../layout/ButtonLoader";
import Loader from "../layout/Loader";

interface UpdateUserProps {}

const UpdateUser: React.FC<UpdateUserProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, user } = useSelector(
    (state: RootState) => state.userDetails
  );
  const {
    loading: updateLoading,
    isUpdated,
    error,
  } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = router.query;

  const submitHandler = (e: any) => {
    e.preventDefault();

    const userData = { name, email, role };

    dispatch(updateUser(id, userData));
  };

  useEffect(() => {
    if (!user || (user && user._id !== id)) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, id, isUpdated, router, user]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="container container-fluid">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                  disabled={updateLoading}
                >
                  {updateLoading ? <ButtonLoader /> : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
