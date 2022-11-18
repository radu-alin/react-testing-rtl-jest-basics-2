import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../App';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae!/i });
  await user.click(orderButton);

  // check summary options items
  const optionItems = screen.getAllByRole('listitem');
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(['1 Vanilla', '1 Cherries']);

  // check summary information based on order
  const scoopsSubtotal = screen.getByRole('heading', { name: /scoops: \$/i });
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const toppingsSubtotal = screen.getByRole('heading', { name: /toppings: \$/i });
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // accept terms and conditions and click the button to confirm order
  const termsAndConditions = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditions);

  const confirmOrder = screen.getByRole('button', { name: /confirm order/i });
  await user.click(confirmOrder);

  // expect "Loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', { name: /thank you!/i });
  expect(thankYouHeader).toBeInTheDocument();

  const orderConfirmation = screen.getByText(/your order number is /i);
  expect(orderConfirmation).toBeInTheDocument();

  // expect "Loading..." to disapear
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // click "New order" button on confirmation page
  const newOrder = screen.getByRole('button', { name: /create new order/i });
  await user.click(newOrder);

  // check that scops and toppings subtotals have been reseted
  const designYourSundaePage = screen.getByRole('heading', {
    name: /Design your sundae!/i,
  });
  expect(designYourSundaePage).toBeInTheDocument();

  const scoopsSubtotalReseted = screen.getByText('Scoops total: $', { exact: false });
  const toppingsSubtotalReseted = screen.getByText('Toppings total: $', { exact: false });

  expect(scoopsSubtotalReseted).toHaveTextContent('0.00');
  expect(toppingsSubtotalReseted).toHaveTextContent('0.00');
});

test('toppings header is not on summary page if no toppings ordered', async () => {
  const user = userEvent.setup();

  // render App
  render(<App />);

  // add ice cream scoops but no toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  // find and click oredr summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole('heading', { name: /scoops: \$/i });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.queryByRole('heading', { name: /toppings: \$/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
