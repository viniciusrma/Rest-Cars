import { Router, Request, Response } from 'express';
import {
  getCar,
  getCars,
  saveCar,
  updateCar,
  removeCar,
  soldCar,
} from './controller/controller';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome to Rest Cars API :D !' });
});

routes.get('/cars', getCars);
routes.get('/cars/:id', getCar);
routes.post('/cars', saveCar);
routes.put('/cars/:id', updateCar);
routes.patch('/cars/:id', soldCar);
routes.delete('/cars/:id', removeCar);

export default routes;
