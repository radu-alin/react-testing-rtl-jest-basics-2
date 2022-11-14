import { OrderDetailsProvider } from '../contexts/OrderDetails';

export const AppProviders = ({ children }: { children: JSX.Element }) => (
  <OrderDetailsProvider>{children}</OrderDetailsProvider>
);
