import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

import { scoops } from '../../../mocks/data-mock';
import { OPTION_TYPE } from '../entry.types';

describe('Options', () => {
  test('display image for each scoop option from server', async () => {
    render(<Options optionType={OPTION_TYPE.SCOOPS} />);

    const scoopsLength = scoops.length;

    // find images and check the number of them
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(scoopsLength);

    const testArray = ['Chocolate scoop', 'Vanilla scoop'];

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual([...testArray]);
  });
});
