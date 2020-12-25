import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { BackspaceFill } from 'react-bootstrap-icons';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

interface ICar {
  id: number;
  brand: string;
  model: string;
  description: string;
  year: number;
}

interface IParamsProps {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParamsProps>();
  const [car, setCar] = useState<ICar>();

  useEffect(() => {
    findCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function back() {
    history.goBack();
  }

  async function findCar() {
    const response = await api.get<ICar>(`/cars/${id}`);
    console.log(response);
    setCar(response.data);
  }

  return (
    <div className="container">
      <br />
      <div className="cars-header">
        <h1>Car Detail</h1>
        <Button size="sm" variant="dark" onClick={() => back()}>
          <BackspaceFill /> Voltar
        </Button>
      </div>
      <br />

      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>{car?.model.toUpperCase()}</Card.Title>
          
          <Card.Subtitle className="mb-2 text-muted">
            {car?.brand}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {car?.year}
          </Card.Subtitle>
          
          <Card.Text>
            {car?.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
