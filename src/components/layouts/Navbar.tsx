import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Navbar.scss";

interface Props {
  className: string;
}

const Navbar = ({ className }: Props) => {
  const { state } = useAuthContext();

  console.log("Navber: User:", state.user);

  return (
    <div className={`navbar ${className}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/page-one"}>Page One</Link>
            </li>
            <li>
              <Link to={"/page-two"}>Page Two</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          ReactTS & Headless WP JWT
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="">
            <Link className="" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/page-one"}>Page One</Link>
          </li>
          <li>
            <Link to={"/page-two"}>Page Two</Link>
          </li>
          <li>
            <Link to={"/send-mail"}>EmailJS</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {state.authIsReady && (
          <>
            <h5 className="px-2">Logged in as {state.user?.user_nicename}</h5>
            <br />
            <p className="badge badge-primary">
              {state.user?.user_display_name}
            </p>{" "}
            <LogoutButton />
          </>
        )}
        {!state.authIsReady && (
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
