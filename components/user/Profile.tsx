import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "next-auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearErrors,
  updateProfileUser,
} from "../../redux/actions/userActions";
import ButtonLoader from "../layout/ButtonLoader";
import { toast } from "react-toastify";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import Loader from "../layout/Loader";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState<User | any>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState<any>("");
  const [avatarPreview, setAvatarPreview] = useState<any>(
    "/images/default_avatar.png"
  );

  const { user: loadedUser, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    loading: updateLoading,
    error,
    isUpdated,
  } = useSelector((state: RootState) => state.user);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const userData = { name, email, password, avatar };
    dispatch(updateProfileUser(userData));
  };

  const onChange = (e: any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (loadedUser) {
      const { name, email, avatar } = loadedUser;
      setUser({
        name,
        email,
      });
      setAvatarPreview(avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, isUpdated, router, loadedUser]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="container container-fluid">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Update Profile</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    autoComplete="username"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    autoComplete="current-password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <Image
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Default Preview"
                          width={100}
                          height={100}
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="update-btn"
                  type="submit"
                  className="btn btn-block py-3 update-btn"
                  disabled={updateLoading}
                >
                  {updateLoading ? <ButtonLoader /> : "UPDATE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
