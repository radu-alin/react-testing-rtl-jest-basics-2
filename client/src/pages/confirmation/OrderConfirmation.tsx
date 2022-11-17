import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { AlertBanner } from '../common/AlertBanner';
import { PHASE_TYPE } from './confirmation.types';

export const OrderConfirmation = ({
  setOrderPhase,
}: {
  setOrderPhase: (orderPhase: PHASE_TYPE) => void;
}) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase(PHASE_TYPE.IN_PROGRESS);
  }

  const newOrderButton = <Button onClick={handleClick}>Create new order</Button>;

  const renderContent = () => {
    if (error) {
      return (
        <>
          <AlertBanner message={null} variant={null} />
          {newOrderButton}
        </>
      );
    }
    if (orderNumber) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Thank You!</h1>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: '25%' }}>
            as per our terms and conditions, nothing will happen now
          </p>
          {newOrderButton}
        </div>
      );
    }
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  };

  return <>{renderContent()}</>;
};
