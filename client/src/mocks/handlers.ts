import { rest } from 'msw';

import { scoops } from './data-mock';

export const handlers = [
  rest.get('https://localhost:3030/scoops', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([...scoops]));
  }),
];
