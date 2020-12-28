/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { BackspaceFill } from 'react-bootstrap-icons';
import api from '../../../services/api';
import './index.css';

interface ICar {
  brand: string;
  model: string;
  description: string;
  sold: boolean;
  year: number;
}

interface IParamsProps {
  id: string;
}

const Cars: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParamsProps>();
  const [car, setCar] = useState<ICar>({
    brand: '',
    model: '',
    description: '',
    sold: false,
    year: 0,
  });

  useEffect(() => {
    if (id !== undefined) {
      findCar(id);
    }
  }, [id]);

  function updatedCar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== undefined) {
      const response = await api.put(`/cars/${id}`, car);
    } else {
      const response = await api.post('/cars', car);
    }
    back();
  }

  async function findCar(id: string) {
    const response = await api.get(`cars/${id}`);
    setCar({
      brand: response.data.brand,
      model: response.data.model,
      description: response.data.description,
      sold: response.data.sold,
      year: response.data.year,
    });
  }

  function back() {
    history.goBack();
  }

  return (
    <>
      <Container>
        <br />
        <div className="cars-header">
          <h1>New Car</h1>
          <Button size="sm" variant="dark" onClick={back}>
            <BackspaceFill /> Voltar
          </Button>
        </div>
        <br />
        <div className="container">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={car.brand}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCar(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={car.model}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCar(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={car.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCar(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={car.year}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCar(e)}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Cars;
