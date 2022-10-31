import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SummaryForm } from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  //  checkbox not checked
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  //  button to be disabled
  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables the button on first click and disables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  //  button to be enabled after checking checkbox
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  //  button to be disavled after unchecking checkbox
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover response to hover', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  //  popver starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //  popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //  popver dissapears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
