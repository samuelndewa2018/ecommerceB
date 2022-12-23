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

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
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
  return (
    <Container className="mt-3">
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

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
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="FormControleye">
                <Form.Control
                  type="password"
                  id="myInput2"
                  placeholder="confirm password"
                  className="FormControlInput"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing..." : "Sign Up"}
            </Button>
          </div>
          <div className="mb-3">
            <p style={{ fontSize: "12px", color: "rgb(239 176 113)" }}>
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </p>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
