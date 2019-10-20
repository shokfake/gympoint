import { Router } from 'express';

// controllers
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
// middlewares

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rotas
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/student', StudentController.store);
routes.put('/student/:id', StudentController.update);

export default routes;
