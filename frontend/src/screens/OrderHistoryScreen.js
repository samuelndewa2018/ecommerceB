import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <Container className="mt-3">
      <div>
        <Helmet>
          <title>Order History</title>
        </Helmet>

        <h1>Order History</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Date</th>
                <th>Total (ksh)</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Shipped</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.replace(/\D/g, '')}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td> {numberWithCommas(order.totalPrice.toFixed(2))}</td>
                  <td className={order.isPaid ? 'green' : 'red'}>
                    {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    {order.isShipped ? order.shippedAt.substring(0, 10) : 'No'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}