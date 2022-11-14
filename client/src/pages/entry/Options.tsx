import { useEffect, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';

import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';

import { OptionItem, OPTION_TYPE } from './entry.types';

export type OptionsProps = {
  optionType: OPTION_TYPE.SCOOPS | OPTION_TYPE.TOPPINGS;
};

export const Options = ({ optionType }: OptionsProps) => {
  const [items, setItems] = useState<OptionItem[]>([]);

  // optionType is 'scoops' or 'toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.log('%c-> developmentConsole: error= ', 'color:#77dcfd', error);
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === OPTION_TYPE.SCOOPS ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};
