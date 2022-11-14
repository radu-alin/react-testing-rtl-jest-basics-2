import { OPTION_TYPE } from './../pages/entry/entry.types';

export const PRICE_PER_ITEM = {
  [OPTION_TYPE.SCOOPS]: 2,
  [OPTION_TYPE.TOPPINGS]: 1.5,
};

export const DEFAULT_TOTALS = {
  [OPTION_TYPE.SCOOPS]: 0.0,
  [OPTION_TYPE.TOPPINGS]: 0.0,
};
