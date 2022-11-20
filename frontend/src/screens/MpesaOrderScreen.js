import React, { useContext, useEffect, useReducer, useState } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import Swal from 'sweetalert2';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function MpesaOrderScreen() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    phone: '',
    amount: '',
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingI, setLoading] = useState(false);
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
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  var reqcount = 0;
  const stkPushQuery = (checkOutRequestID) => {
    const timer = setInterval(() => {
      reqcount += 1;
      if (reqcount === 20) {
        clearInterval(timer);
        setLoading(false);
        setErrorMsg('you took too long to pay');
        setError(true);
        return;
      }
      axios
        .post('/stkpushquery', {
          CheckoutRequestID: checkOutRequestID,
        })
        .then((response) => {
          if (response.data.ResultCode === '0') {
            clearInterval(timer);
            //successfull payment
            setLoading(false);
            Swal.fire(
              'SUCCESS!',
              "We received your purchase request , we'll be in touch shortly!",
              'success'
            );
            setDetails({
              phone: '',
              amount: '',
            });
          } else if (response.errorCode === '500.001.1001') {
            console.log(response.errorMessage);
          } else {
            clearInterval(timer);
            setLoading(false);
            setError(true);
            setErrorMsg(response.data.ResultDesc);
            // console.log(response);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 2000);
  };
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (!details.phone || !details.amount) {
        setError(true);
        setErrorMsg('please fill all fields');
        return;
      }
      if (details.phone.length !== 10) {
        setError(true);
        setErrorMsg('enter a valid phone number');
        return;
      }
      if (details.phone.substring(0, 2) !== '07') {
        if (details.phone.substring(0, 2) !== '01') {
          setError(true);
          setErrorMsg('start with 07.. or 01..');
          return;
        }
      }

      setError(false);
      setErrorMsg('');

      axios
        .post('/stk', details)
        .then((res) => {
          setLoading(true);
          stkPushQuery(res.data.CheckoutRequestID);
          console.log(res.data.CheckoutRequestID);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg('something wrong happened..try later');
        });
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                          ></img>{' '}
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
                        {' '}
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
                        Proceed To Payment
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
