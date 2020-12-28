import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import api from '../../../services/api';
import { PlusCircleFill } from 'react-bootstrap-icons';
import './AddModal.css';

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

const AddModal: React.FC = () => {
  const { id } = useParams<IParamsProps>();
  const [car, setCar] = useState<ICar>({
    brand: '',
    model: '',
    description: '',
    sold: false,
    year: 0,
  });
  const [show, setShow] = useState(false);

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
    try {
      e.preventDefault();
      if (id !== undefined) {
        const response = await api.put(`/cars/${id}`, car);
      } else {
        const response = await api.post('/cars', car);
      }
      handleClose();
    } catch (error) {
      return error;
    }
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <PlusCircleFill className="add" size="50" onClick={handleShow} />
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Vehicle</Modal.Title>
        </Modal.Header>
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
      </Modal>
    </>
  );
};

export default AddModal;
