import axios from "axios";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import {
  addUser,
  selectCurrentToken,
  selectReady,
} from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import AccountNav from "./AccountNav";
import Places from "./Places";

const logoutURL = "/auth/logout";

const Account = () => {
  const { username, email } = useAuth();
  const token = useSelector(selectCurrentToken);
  const ready = useSelector(selectReady);

  const navigate = useNavigate();

  const { subpage } = useParams();

  const dispatch = useDispatch();


  const logoutUser = async () => {
    const response = await axios.get(logoutURL);
    const data = await response.data;
    console.log(data);
    navigate("/");
    dispatch(addUser(data));
  };
  
  if (!username || !email) {
    return (
      <Navigate to="/login" />
    )
  }

  if (!ready) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <AccountNav/>
      {!subpage && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {username} ({email})
          <button className="primary max-w-sm mt-2" onClick={logoutUser}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Account;
