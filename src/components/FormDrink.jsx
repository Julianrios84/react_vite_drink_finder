import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import useCategories from '../hooks/useCategories';
import useDrinks from '../hooks/useDrinks';

const FormDrink = () => {
  const [search, setSearch] = useState({
    name: '',
    category: ''
  });
  const [alert, setAlert] = useState('');
  const { categories } = useCategories();
  const { consultDrinks } = useDrinks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(search).includes('')) {
      setAlert('All fields are required');
      return;
    }
    setAlert('');
    consultDrinks(search);
  };

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alert && (
        <Alert variant="danger" className="text-center">
          {alert}
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Drink name</Form.Label>

            <Form.Control
              id="name"
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="name"
              value={search.name}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Drink category</Form.Label>

            <Form.Select
              id="category"
              name="category"
              value={search.category}
              onChange={(e) => handleChange(e)}
            >
              <option>- Select category -</option>
              {categories.map((category) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            variant="danger"
            className="text-uppercase w-100"
            type="submit"
          >
            Find drinks
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormDrink;
