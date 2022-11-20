import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import Container from 'react-bootstrap/Container';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Mpesa'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    if (paymentMethodName === 'Mpesa') {
      navigate('/mpesa');
    }
    if (paymentMethodName === 'PayPal') {
      navigate('/paypal');
    }
    if (paymentMethodName === 'Delivery') {
      navigate('/placeorder');
    }
  };
  return (
    <Container className="mt-3">
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="container small-container">
          <Helmet>
            <title>Payment Method</title>
          </Helmet>
          <h1 className="my-3">Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Mpesa"
                label="Mpesa"
                value="Mpesa"
                checked={paymentMethodName === 'Mpesa'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Delivery"
                label="On Delivery"
                value="Delivery"
                checked={paymentMethodName === 'Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
