import { useEffect, useState } from 'react';
import axios from 'axios';

import { formatCurrency } from '../../utilities';

import { useOrderDetails } from '../../contexts/OrderDetails';

import Row from 'react-bootstrap/Row';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';
import { AlertBanner } from '../common/AlertBanner';

import { OptionItem, OPTION_TYPE } from './entry.types';
import { PRICE_PER_ITEM } from '../../constants';

export type OptionsProps = {
  optionType: OPTION_TYPE.SCOOPS | OPTION_TYPE.TOPPINGS;
};

export const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<OptionItem[]>([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((_) => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === OPTION_TYPE.SCOOPS ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}{' '}
      </p>
      <Row>{error ? <AlertBanner /> : optionItems}</Row>
    </>
  );
};
