import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loaderUser } from "../../redux/actions/userActions";
import { signOut } from "next-auth/client";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.loadedUser);

  const logoutHandler = () => {
    signOut();
  };

  useEffect(() => {
    dispatch(loaderUser());
  }, [dispatch]);

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <a>
                <Image
                  src="/images/bookit_logo.png"
                  alt="BookIT"
                  width={145}
                  height={33}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          {user && (
            <div className="ml-4 dropdown">
              <a
                className="btn dropdown-toggle d-inline-flex align-items-center mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                role="button"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    width={35}
                    height={35}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user.name}</span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <>
                    <Link href="/admin/rooms">
                      <a className="dropdown-item">Rooms</a>
                    </Link>
                    <Link href="/admin/bookings">
                      <a className="dropdown-item">Bookings</a>
                    </Link>
                    <Link href="/admin/users">
                      <a className="dropdown-item">Users</a>
                    </Link>
                    <Link href="/admin/reviews">
                      <a className="dropdown-item">Reviews</a>
                    </Link>
                    <hr />
                  </>
                )}
                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>
                <Link href="/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>
                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          )}
          {!user && !loading && (
            <Link href="/login">
              <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
