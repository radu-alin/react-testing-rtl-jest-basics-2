import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

import Button from 'react-bootstrap/Button';

import { Options } from './Options';
import { OPTION_TYPE } from './entry.types';
import { PHASE_TYPE } from '../confirmation/confirmation.types';

export const OrderEntry = ({
  setOrderPhase,
}: {
  setOrderPhase: (orderPhase: PHASE_TYPE) => void;
}) => {
  const { totals } = useOrderDetails();

  // disable order button if there aren't any scoops in order
  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType={OPTION_TYPE.SCOOPS} />
      <Options optionType={OPTION_TYPE.TOPPINGS} />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button
        disabled={orderDisabled}
        onClick={() => setOrderPhase && setOrderPhase(PHASE_TYPE.REVIEW)}
      >
        Order Sundae!
      </Button>
    </div>
  );
};
