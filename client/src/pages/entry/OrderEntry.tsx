import { OPTION_TYPE } from './entry.types';
import { Options } from './Options';

export const OrderEntry = () => {
  return (
    <div>
      <Options optionType={OPTION_TYPE.SCOOPS} />
      <Options optionType={OPTION_TYPE.TOPPINGS} />
    </div>
  );
};
