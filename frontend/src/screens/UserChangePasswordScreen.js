import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function UserChangePasswordScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [oldpassword, setoldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newpassword !== confirmPassword) {
      toast.error("New passwords does not match");
    } else {
      try {
        const { data } = await axios.put(
          "/api/users/change/password",
          {
            oldpassword,
            newpassword,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: "UPDATE_SUCCESS",
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Password updated successfully");
        navigate("/profile");
        setLoading(false);
      } catch (err) {
        setLoading(false);

        dispatch({
          type: "FETCH_FAIL",
        });
        toast.error(getError(err));
      }
    }
    setLoading(false);
  };
  const seePassword = () => {
    var x = document.getElementById("myInput");
    var y = document.getElementById("hide2");
    var z = document.getElementById("hide1");

    if (x.type === "password") {
      x.type = "text";
      y.style.display = "block";
      z.style.display = "none";
    } else {
      x.type = "password";
      y.style.display = "none";
      z.style.display = "block";
    }
  };
  const seePassword2 = () => {
    var x = document.getElementById("myInput2");
    var y = document.getElementById("hide4");
    var z = document.getElementById("hide3");

    if (x.type === "password") {
      x.type = "text";
      y.style.display = "block";
      z.style.display = "none";
    } else {
      x.type = "password";
      y.style.display = "none";
      z.style.display = "block";
    }
  };
  const seePassword3 = () => {
    var x = document.getElementById("myInput3");
    var y = document.getElementById("hide6");
    var z = document.getElementById("hide5");

    if (x.type === "password") {
      x.type = "text";
      y.style.display = "block";
      z.style.display = "none";
    } else {
      x.type = "password";
      y.style.display = "none";
      z.style.display = "block";
    }
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter Old Password</Form.Label>
          <div className="FormControleye">
            <Form.Control
              type="password"
              id="myInput"
              placeholder="old password"
              className="FormControlInput"
              onChange={(e) => setoldPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={seePassword}
              style={{ cursor: "ponter" }}
            >
              <div id="hide1">
                <i className="fa fa-eye"></i>
              </div>
              <div id="hide2">
                <i className="fa fa-eye-slash"></i>
              </div>
            </span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter New Password</Form.Label>
          <div className="FormControleye">
            <Form.Control
              type="password"
              id="myInput2"
              placeholder="new password"
              className="FormControlInput"
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={seePassword2}
              style={{ cursor: "ponter" }}
            >
              <div id="hide3">
                <i className="fa fa-eye"></i>
              </div>
              <div id="hide4">
                <i className="fa fa-eye-slash"></i>
              </div>
            </span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Re-enter New Password</Form.Label>
          <div className="FormControleye">
            <Form.Control
              type="password"
              id="myInput3"
              placeholder="confirm password"
              className="FormControlInput"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={seePassword3}
              style={{ cursor: "ponter" }}
            >
              <div id="hide5">
                <i className="fa fa-eye"></i>
              </div>
              <div id="hide6">
                <i className="fa fa-eye-slash"></i>
              </div>
            </span>
          </div>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">{loading ? "Updating..." : "Update"}</Button>
        </div>
      </form>
    </div>
  );
}
