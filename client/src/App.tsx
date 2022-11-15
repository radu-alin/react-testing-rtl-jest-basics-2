import { OrderDetailsProvider } from './contexts/OrderDetails';

import Container from 'react-bootstrap/Container';

import { OrderEntry } from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <>
          <OrderEntry />
          <OrderSummary setOrderPhase={() => {}} />
        </>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
