import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { OPTION_TYPE } from '../entry.types';

import { OrderEntry } from '../OrderEntry';

describe('OrderEntry', () => {
  test('handle error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/' + OPTION_TYPE.SCOOPS, (_, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/' + OPTION_TYPE.TOPPINGS, (_, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });
});
