import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ButtonLoader from "../layout/ButtonLoader";

interface LoginComponentProps {}

const LoginComponent: React.FC<LoginComponentProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    console.log(result, 123);

    if (result?.error) {
      toast.error(result.error);
    } else {
      window.location.href = "/";
      // router.push("/");
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                autoComplete="username"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="#" className="float-right mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : "LOGIN"}
            </button>

            <Link href="/register">
              <a className="float-right mt-3">New User?</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
