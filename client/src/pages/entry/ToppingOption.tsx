import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../contexts/OrderDetails';

import { OptionItem, OPTION_TYPE } from './entry.types';

export const ToppingOption = ({ name, imagePath }: OptionItem) => {
  const { updateItemCount } = useOrderDetails();

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) =>
            updateItemCount(name, e.target.checked ? 1 : 0, OPTION_TYPE.TOPPINGS)
          }
          label={name}
        />
      </Form.Group>
    </Col>
  );
};
