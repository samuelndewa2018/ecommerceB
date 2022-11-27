import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useState, useReducer } from "react";
import { toast } from "react-toastify";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGOT_PASSWORD_REQUEST":
    case "RESET_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case "FORGOT_PASSWORD_FAIL":
    case "RESET_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [{ looading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }
    try {
      setLoading(true);
      dispatch({ type: "RESET_PASSWORD_REQUEST" });

      const { data } = await axios.post(`api/users/forgot`, {
        email,
      });
      dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message });

      setLoading(false);
      toast.success(data.message);
    } catch (err) {
      dispatch({
        type: "FORGOT_PASSWORD_FAIL",
        payload: err.response.data.message,
      });
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <Container className="mt-3">
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Forgot Password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit" disable={loading}>
              {loading ? "Submiting..." : "Submit"}
            </Button>
          </div>
          <div className="mb-3">
            Remembered Password? <Link to={`/signin`}>Sign In</Link>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
