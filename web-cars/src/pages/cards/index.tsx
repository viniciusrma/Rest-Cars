import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { TagFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import AddModal from './components/AddModal';
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

  const [descriptionVisibility, setIsDescriptionVisibility] = useState(false);
  const [currentDescription, setCurrentDescription] = useState<ICar | null>(
    null,
  );

  const handleDescription = (description: ICar) => {
    setCurrentDescription(description);
    setIsDescriptionVisibility(true);
  };

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

  return (
    <div className="container">
      <br />
      <div className="cars-header">
        <h1>Vehicles</h1>
        {/* <PlusCircleFill className="add" size="50" onClick={newCar} /> */}
        <AddModal />
      </div>
      <br />
      <Row className="section">
        <Col xs={12} md={6}>
          <strong>Vehicles List</strong>
          {cars.map((car) => (
            <Card
              className="card-general"
              onClick={() => handleDescription(car)}
            >
              <div className="flex">
                <div>
                  <p className="brand">{car.brand.toUpperCase()}</p>
                  <p className="model">{car.model}</p>
                  <p className="year">{car.year}</p>
                </div>
                <div className="tag">
                  <TagFill
                    className="tagfill"
                    style={{ color: car.sold ? '#4C8D74' : '#454545' }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <Col xs={12} md={6}>
          <strong>Details</strong>
          <Card className="details">
            <p className="modelDetail">{currentDescription?.model}</p>
            <br />
            <div className="flex">
              <div>
                <strong>Brand</strong>
                <p className="brandDetail">
                  {currentDescription?.brand.toUpperCase()}
                </p>
              </div>
              <div>
                <strong>Year</strong>
                <p className="yearDetail">{currentDescription?.year}</p>
              </div>
            </div>
            <br />
            <div>
              <strong>Description</strong>
              <p className="descriptionDetail">
                {currentDescription?.description}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
