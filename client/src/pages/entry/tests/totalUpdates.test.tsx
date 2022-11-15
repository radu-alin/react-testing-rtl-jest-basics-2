import { act, render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';

import { OPTION_TYPE } from '../entry.types';

describe('totalUpdates', () => {
  test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType={OPTION_TYPE.SCOOPS} />);

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('update toppings subtotal when toppings change', async () => {
    const user = userEvent.setup();
    render(<Options optionType={OPTION_TYPE.TOPPINGS} />);

    // make sure total starts out $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // add cherries topping and check the subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    await user.click(cherriesCheckbox);

    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // add hot fudge topping and check subtotal
    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
    await user.click(hotFudgeCheckbox);

    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox);

    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });
});

describe('grand total', () => {
  test('grand total starts at $0.00', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    expect(grandTotal).toHaveTextContent('0.00');

    // we await the promise instead of returning directly, because act expects a "void" result
    const promise = Promise.resolve();
    await act(async () => {
      await promise;
    });
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
    await user.clear(vanillaInput);
    expect(grandTotal).toHaveTextContent('0.00');
  });
});
