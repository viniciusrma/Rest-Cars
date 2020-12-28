import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './index.css';

interface ICar {
  id: number;
  brand: string;
  model: string;
  description: string;
  sold: false;
  year: number;
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    const response = await api.get('/cars');
    console.log(response);
    setCars(response.data);
  }

  async function soldCar(id: number) {
    await api.patch(`/cars/${id}`);
    loadCars();
  }

  async function deleteCar(id: number) {
    await api.delete(`/cars/${id}`);
    loadCars();
  }

  function newCar() {
    history.push('/cars_form');
  }

  function editCar(id: number) {
    history.push(`/cars_form/${id}`);
  }

  function viewCar(id: number) {
    history.push(`/cars/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="cars-header">
        <h1>Cars Cards Page</h1>
        <Button size="sm" variant="dark" onClick={newCar}>
          <PlusSquare /> New Car
        </Button>
      </div>
      <br />
      <Row className="section">
        <Col xs={12} md={6}>
          {cars.map((car) => (
            <Card

              className="card-general"
              onClick={() => console.log('working')}
            >
              <strong>{car.brand.toUpperCase()}</strong>
              <h3>{car.model}</h3>
              <strong>{car.year}</strong>
            </Card>
          ))}
        </Col>
        <Col xs={12} md={6}>
          <Card className="card-details">
            Trance
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
