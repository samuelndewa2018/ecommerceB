import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [loading, setLoading] = useState(false);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
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
      setLoading(false);

      toast.success("User updated successfully");
    } catch (err) {
      setLoading(false);

      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
    setLoading(false);
  };
  const signoutHandler = (e) => {
    e.preventDefault();
    toast.success("Signed Out. Bye!");
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    navigate("/");
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>

      <Row>
        <ul className="row summary" style={{ listStyle: "none" }}>
          <Col md={6}>
            <Card>
              <li>
                {" "}
                <div className="summary-title color1">
                  <span>
                    <i className="fa fa-user-circle" /> Name
                  </span>
                </div>
                <div className="summary-body2">{userInfo.name}</div>
              </li>
            </Card>
          </Col>{" "}
          <Col md={6}>
            <Card>
              <li>
                <div className="summary-title color2">
                  <span>
                    <i className="fa fa-envelope" /> Email
                  </span>
                </div>
                <div className="summary-body2">{userInfo.email}</div>
              </li>
            </Card>
          </Col>{" "}
        </ul>
      </Row>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Change Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Change Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <div className="displayFlex" onClick={signoutHandler}>
          {" "}
          <i
            class="fas fa-sign-out-alt"
            style={{ padding: "5px 10px" }}
          ></i>{" "}
          <Link to="">sign out</Link>
        </div>
        <div className="displayFlex">
          {" "}
          <i className="fa fa-key" style={{ padding: "5px 10px" }}></i>
          <Link to="/change/password">change password</Link>
        </div>
        <div className="mb-3">
          <Button type="submit">{loading ? "Updating..." : "Update"}</Button>
        </div>
      </form>
    </div>
  );
}
