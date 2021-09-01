import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteUser,
  getAdminUsers,
} from "../../redux/actions/userActions";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import { RootState } from "../../redux/store";
import Loader from "../layout/Loader";

interface AllUsersProps {}

const AllUsers: React.FC<AllUsersProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.allUsers
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state: RootState) => state.user
  );

  const setUsers = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    users &&
      users.forEach((user: any) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a href="" className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteUserHandler = (id: any) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [deleteError, dispatch, error, isDeleted, router]);

  return (
    <div className="container container-fluid">
      {loading && <Loader />}
      {!loading && (
        <>
          <h1 className="my-5">{users && users.length} Users </h1>

          <MDBDataTable
            data={setUsers()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllUsers;
