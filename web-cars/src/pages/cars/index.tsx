import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Pencil, DoorOpen, PlusSquare, Trash2, CheckCircle } from 'react-bootstrap-icons';
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

const Cars: React.FC = () => {
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
        <h1>Cars Page</h1>
        <Button size="sm" variant="dark" onClick={newCar}>
          <PlusSquare /> New Car
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Description</th>
            <th>Sold</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.description}</td>
              <td>
                <Badge variant={car.sold ? 'danger' : 'success'}>
                  {car.sold ? 'Sold' : 'In Stock'}
                </Badge>
              </td>
              <td>{car.year}</td>
              <td>
                <Button size="sm" onClick={() => editCar(car.id)}>
                  <Pencil /> Edit
                </Button>{' '}
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => viewCar(car.id)}
                >
                  <DoorOpen /> View
                </Button>{' '}
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => soldCar(car.id)}
                >
                  <CheckCircle /> Sold
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteCar(car.id)}
                >
                  <Trash2 /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cars;
