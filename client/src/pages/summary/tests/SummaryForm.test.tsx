import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SummaryForm } from '../SummaryForm';

describe('SummaryForm', () => {
  test('initial conditions', () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmButton).toBeDisabled();
  });

  describe('Checkbox', () => {
    test('checkbox enables button on first click and disables on second click', async () => {
      const user = userEvent.setup();

      render(<SummaryForm setOrderPhase={jest.fn()} />);
      const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
      });
      const confirmButton = screen.getByRole('button', { name: /confirm order/i });

      await user.click(checkbox);
      expect(confirmButton).toBeEnabled();

      await user.click(checkbox);
      expect(confirmButton).toBeDisabled();
    });
  });

  describe('Popover', () => {
    test('popover responds to hover', async () => {
      const user = userEvent.setup();
      render(<SummaryForm setOrderPhase={jest.fn()} />);

      // popover starts hidden
      const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
      expect(nullPopover).not.toBeInTheDocument();

      // popover apperars on monseover of checkbox label
      const termsAndConditions = screen.getByText(/terms and conditions/i);
      await user.hover(termsAndConditions);

      const popover = screen.getByText(/no ice cream will actually be delivered/i);
      expect(popover).toBeInTheDocument();

      // popover disappears when we mouse out
      await user.unhover(termsAndConditions);
      expect(popover).not.toBeInTheDocument();
    });
  });
});
