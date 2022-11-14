import { rest } from 'msw';

import { scoops, toppings } from './data-mock';

import { OPTION_TYPE } from './../pages/entry/entry.types';

export const handlers = [
  rest.get('http://localhost:3030/' + OPTION_TYPE.SCOOPS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([...scoops]));
  }),
  rest.get('http://localhost:3030/' + OPTION_TYPE.TOPPINGS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([...toppings]));
  }),
];
