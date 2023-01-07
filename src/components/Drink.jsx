import { Col, Card, Button } from 'react-bootstrap'
import { useCallback } from 'react';
import useDrinks from '../hooks/useDrinks';

const Drink = ({ drink }) => {
  const { handleModalClick, handleDrinkIdClick } = useDrinks();

  const handleClick = useCallback(() => {
    handleModalClick();
    handleDrinkIdClick(drink.idDrink);
  }, [drink]);

  return (
    <Col md={6} lg={3}>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
        />

        <Card.Body>
          <Card.Title>{drink.strDrink}</Card.Title>
          <Button
            variant={'warning'}
            className="w-100 text-uppercase mt-2"
            onClick={handleClick}
          >
            See recipe
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Drink;
