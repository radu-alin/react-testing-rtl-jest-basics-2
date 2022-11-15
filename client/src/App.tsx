import { useState } from 'react';

import { OrderDetailsProvider } from './contexts/OrderDetails';

import Container from 'react-bootstrap/Container';

import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderSummary } from './pages/summary/OrderSummary';
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation';
import { PHASE_TYPE } from './pages/confirmation/confirmation.types';

export const App = () => {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState(PHASE_TYPE.IN_PROGRESS);

  const renderContent = (): JSX.Element => {
    switch (orderPhase) {
      case PHASE_TYPE.IN_PROGRESS:
        return <OrderEntry setOrderPhase={setOrderPhase} />;
      case PHASE_TYPE.REVIEW:
        return <OrderSummary setOrderPhase={setOrderPhase} />;
      case PHASE_TYPE.COMPLETED:
        return <OrderConfirmation setOrderPhase={setOrderPhase} />;
      default:
        return <OrderEntry setOrderPhase={setOrderPhase} />;
    }
  };

  return (
    <OrderDetailsProvider>
      <Container>{renderContent()}</Container>
    </OrderDetailsProvider>
  );
};

export default App;
