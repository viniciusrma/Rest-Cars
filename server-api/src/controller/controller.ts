import { getRepository } from 'typeorm';
import { Cars } from '../entity/cars';
import { Request, Response } from 'express';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

export const getCars = async (request: Request, response: Response) => {
  const cars = await getRepository(Cars).find();
  return response.json(cars);
};

export const getCar = async (request: Request, response: Response) => {
  const { id } = request.params;
  const car = await getRepository(Cars).findOne(id);
  return response.json(car);
};

export const saveCar = async (request: Request, response: Response) => {
  const car = await getRepository(Cars).save(request.body);
  response.json(car);
};

export const updateCar = async (request: Request, response: Response) => {
  const { id } = request.params;

  const car = await getRepository(Cars).update(id, request.body);

  if (car.affected === 1) {
    const carUpdated = await getRepository(Cars).findOne(id);
    return response.json(carUpdated);
  }

  return response.status(404).json({ message: 'Car not found!' });
};

export const soldCar = async (request: Request, response: Response) => {
  const { id } = request.params;

  const car = await getRepository(Cars).update(id, {
    sold: true,
  });

  if (car.affected === 1) {
    const carUpdated = await getRepository(Cars).findOne(id);
    return response.json({ message: 'Car sold!' });
  }

  return response.status(404).json({ message: 'Car not found!' });
};

export const removeCar = async (request: Request, response: Response) => {
  const { id } = request.params;

  const car = await getRepository(Cars).delete(id);

  if (car.affected === 1) {
    const carDeleted = await getRepository(Cars).findOne(id);
    return response.json({ message: 'Car removed!' });
  }

  return response.status(404).json({ message: 'Car not found!' });
};
