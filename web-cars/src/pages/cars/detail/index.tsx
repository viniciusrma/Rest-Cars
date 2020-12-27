import React, { useState } from 'react';
import { Badge, Card, Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';

interface ICar {
  id: number;
  brand: string;
  model: string;
  description: string;
  sold: boolean;
  year: number;
}

interface IParamsProps {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParamsProps>();
  const [carDetails, setCarDetails] = useState<ICar | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  async function showDescription(description: ICar) {
    setCarDetails(description);
    setDetailsVisible(true);
  }

  return (
    <>
      <Container>
        <br />
        <div className="cars-header">
          <h1>Car Detail</h1>
        </div>
        <br />

        <Card style={{ width: '24rem'}} >
          <Card.Body>
            <Card.Title>{carDetails?.model.toUpperCase()}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              {carDetails?.brand}
            </Card.Subtitle>

            <Card.Subtitle className="mb-2 text-muted">
              {carDetails?.year}
            </Card.Subtitle>

            <Card.Subtitle className="mb-2 text-muted">
              {carDetails?.sold}
            </Card.Subtitle>

            <Badge variant={carDetails?.sold ? 'danger' : 'success'}>
              {carDetails?.sold ? 'Sold' : 'In Stock'}
            </Badge>

            <Card.Text>{carDetails?.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Detail;
