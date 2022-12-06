import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordScreen() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { user } = state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/users/password/reset/${token}`, {
          password,

          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
          // config
        });
        toast.success("Password reset successful");
        console.log(password);
        navigate("/profile");
      } catch (error) {
        setLoading(false);
        toast.error("Invalid or expired token");
        toast.error(error);
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

  return (
    <Container className="mt-3">
      <Container className="small-container">
        <Helmet>
          <title>Reset Password</title>
        </Helmet>
        <h1 className="my-3">Reset Password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Enter New Password</Form.Label>
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
            <Form.Label>Confirm New Password</Form.Label>
            <div className="FormControleye">
              <Form.Control
                type="password"
                id="myInput2"
                placeholder="confirm password"
                className="FormControlInput"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            </div>{" "}
          </Form.Group>

          <div className="mb-3">
            <Button type="submit" disable={loading}>
              {loading ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
