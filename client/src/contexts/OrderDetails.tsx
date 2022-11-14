import React, { createContext, useContext, useState } from 'react';

import { DEFAULT_TOTALS, PRICE_PER_ITEM } from '../constants';

import { OPTION_TYPE } from '../pages/entry/entry.types';

type OptionCountType = {
  [OPTION_TYPE.SCOOPS]: {};
  [OPTION_TYPE.TOPPINGS]: {};
};

const OrderDetailsContext = createContext<{
  optionCounts: OptionCountType;
  totals: { [OPTION_TYPE.SCOOPS]: number; [OPTION_TYPE.TOPPINGS]: number };
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OPTION_TYPE.SCOOPS | OPTION_TYPE.TOPPINGS
  ) => void;
  resetOrder: () => void;
}>({
  optionCounts: { [OPTION_TYPE.SCOOPS]: {}, [OPTION_TYPE.TOPPINGS]: {} },
  totals: {
    [OPTION_TYPE.SCOOPS]: DEFAULT_TOTALS[OPTION_TYPE.SCOOPS],
    [OPTION_TYPE.TOPPINGS]: DEFAULT_TOTALS[OPTION_TYPE.TOPPINGS],
  },
  updateItemCount: (itemName, newItemCount, optionType) => {},
  resetOrder: () => {},
});

// create custom hook to check whether we're in a provider
export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetailsContext);

  if (!contextValue) {
    throw new Error('userDetails must be called from within an OrderProvider');
  }

  return contextValue;
};

const initialState: OptionCountType = {
  [OPTION_TYPE.SCOOPS]: {},
  [OPTION_TYPE.TOPPINGS]: {},
};

export const OrderDetailsProvider = ({ children }: { children: JSX.Element }) => {
  const [optionCounts, setOptionCounts] = useState<OptionCountType>({ ...initialState });

  const updateItemCount = (
    itemName: string,
    newItemCount: number,
    optionType: OPTION_TYPE.SCOOPS | OPTION_TYPE.TOPPINGS
  ) => {
    return setOptionCounts({
      ...optionCounts,
      [optionType]: { ...optionCounts[optionType], [itemName]: newItemCount },
    });
  };

  const resetOrder = () => {
    setOptionCounts({ ...initialState });
  };

  // utility function
  const calculateTotalHelper = (
    optionType: OPTION_TYPE.SCOOPS | OPTION_TYPE.TOPPINGS
  ) => {
    if (Object.keys(optionType).length === 0) {
      return 0;
    }
    const countsArray = Object.values(optionCounts[optionType]) as number[];
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * PRICE_PER_ITEM[optionType];
  };

  const totals = {
    [OPTION_TYPE.SCOOPS]: calculateTotalHelper(OPTION_TYPE.SCOOPS),
    [OPTION_TYPE.TOPPINGS]: calculateTotalHelper(OPTION_TYPE.TOPPINGS),
  };

  const value = {
    optionCounts,
    totals,
    updateItemCount,
    resetOrder,
  };

  return (
    <OrderDetailsContext.Provider value={value}>{children}</OrderDetailsContext.Provider>
  );
};
