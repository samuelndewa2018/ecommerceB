import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      setLoading(false);
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

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
  return (
    <Container className="mt-3">
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="FormControleye">
              <Form.Control
                type="password"
                id="myInput"
                placeholder="password"
                className="FormControlInput"
                required
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="mb-3">
            <Button type="submit" disable={loading}>
              {loading ? "Signing..." : "Sign In"}
            </Button>
          </div>
          <div className="mb-3">
            <p style={{ fontSize: "12px", color: "rgb(239 176 113)" }}>
              {" "}
              Forgot password? <Link to="/forgot">Forgot password</Link>
            </p>
          </div>
          <div className="mb-3">
          <p style={{ fontSize: "12px", color: "rgb(239 176 113)" }}>
              New customer?{" "}
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>{" "}
            </p>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
