import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

import { Options } from './Options';
import { OPTION_TYPE } from './entry.types';

export const OrderEntry = () => {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType={OPTION_TYPE.SCOOPS} />
      <Options optionType={OPTION_TYPE.TOPPINGS} />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
};
