import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../../services/api';

interface ICar {
  id: number;
  brand: string;
  model: string;
  description: string;
  year: number;
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    const response = await api.get('/cars');
    console.log(response);
    setCars(response.data);
  }

  return (
    <div className="container">
      <br />
      <h1>Cars Page</h1>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Description</th>
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
              <td>{car.year}</td>
              <td>
                <Button size="sm">Edit</Button>{' '}
                <Button size="sm"variant="info">View</Button>{' '}
                <Button size="sm" variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cars;
