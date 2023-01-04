import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import Container from "react-bootstrap/Container";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PaypalOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = 0;
  <></>;
  if (cart.shippingAddress.city === "Nairobi") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Nyamira") {
    const locationPrice = 200;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kisii") {
    const locationPrice = 200;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Migori") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Homa Bay") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kisumu") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Siaya") {
    const locationPrice = 280;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Busia") {
    const locationPrice = 300;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Bungoma") {
    const locationPrice = 280;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Vihiga") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kakamega") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Bomet") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kericho") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kajiado") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Narok") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Nakuru") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Laikipia") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Baringo") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Nandi") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Elgeyo-Marakwet") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Uasin Gishu") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Trans-Nzoia") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Samburu") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "West Pokot") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Turkana") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kiambu") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Murang'a") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kirinyaga") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Nyeri") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Nyandarua") {
    const locationPrice = 150;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Makueni") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Machakos") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kitui") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Embu") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Tharaka-Nithi") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Meru") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Isiolo") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Marsabit") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Mandera") {
    const locationPrice = 50;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Wajir") {
    const locationPrice = 380;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Garissa") {
    const locationPrice = 240;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Taita Taveta") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Lamu") {
    const locationPrice = 350;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Tana River") {
    const locationPrice = 250;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kilifi") {
    const locationPrice = 350;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Kwale") {
    const locationPrice = 350;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "Mombasa") {
    const locationPrice = 350;
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0 + locationPrice)
        : cart.itemsPrice > 5000
        ? round2(100 + locationPrice)
        : round2(200 + locationPrice);
  }
  if (cart.shippingAddress.city === "") {
    cart.shippingPrice =
      cart.itemsPrice > 10000
        ? round2(0)
        : cart.itemsPrice > 5000
        ? round2(100)
        : round2(200);
  }

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          username: userInfo.name,
          useremail: userInfo.email,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Container className="mt-3">
      <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
          <title>Preview Order</title>
        </Helmet>
        <h1 className="my-3">Preview Order</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  .
                  <br />
                  {cart.shippingAddress.country}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{" "}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>Ksh. {numberWithCommas(item.price)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup>
                <Link to="/cart">Edit</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        Ksh. {numberWithCommas(cart.itemsPrice.toFixed(2))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>
                        Ksh. {numberWithCommas(cart.shippingPrice.toFixed(2))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>
                        {" "}
                        Ksh. {numberWithCommas(cart.taxPrice.toFixed(2))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>
                          Ksh. {numberWithCommas(cart.totalPrice.toFixed(2))}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        {loading ? "processing..." : "Proceed To Payment"}
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
