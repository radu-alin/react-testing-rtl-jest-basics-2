import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

import { scoops, toppings } from '../../../mocks/data-mock';
import { OPTION_TYPE } from '../entry.types';

describe('Options', () => {
  test('display image for each scoop option from server', async () => {
    render(<Options optionType={OPTION_TYPE.SCOOPS} />);

    const scoopsLength = scoops.length;

    // find images and check the number of them
    const scoopImages = (await screen.findAllByRole('img', {
      name: /scoop$/i,
    })) as HTMLImageElement[];
    expect(scoopImages).toHaveLength(scoopsLength);

    const testArray = ['Chocolate scoop', 'Vanilla scoop'];

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual([...testArray]);
  });
  test('display image for each topping option from server', async () => {
    render(<Options optionType={OPTION_TYPE.TOPPINGS} />);

    // find images and check the number of them
    const toppingImages = (await screen.findAllByRole('img', {
      name: /topping$/i,
    })) as HTMLImageElement[];
    const toppingsLength = toppings.length;
    expect(toppingImages).toHaveLength(toppingsLength);

    const testArray = ['Cherries topping', 'M&Ms topping', 'Hot fudge topping'];

    // confirm alt text of images
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual([...testArray]);
  });
});
