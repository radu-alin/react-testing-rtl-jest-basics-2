import React from 'react';
import { SummaryForm } from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import { PHASE_TYPE } from '../confirmation/confirmation.types';

export const OrderSummary = ({
  setOrderPhase,
}: {
  setOrderPhase: (orderPhase: PHASE_TYPE) => void;
}) => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => {
    if (typeof value === 'number' && value > 0) {
      return <li key={key}>{`${value} ${key}`}</li>;
    }
    return null;
  });

  // only display toppings if the toppings total is nonzero
  const hasToppings = totals.toppings > 0;
  let toppingsDisplay = null;
  if (hasToppings) {
    const toppingsArray = Object.entries(optionCounts.toppings);
    const toppingList = toppingsArray.map(([key, value]) => {
      if (Number(value) > 0) {
        return <li key={key}>{`${value} ${key}`}</li>;
      }
      return null;
    });
    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
