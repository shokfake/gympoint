import { Router } from 'express';

// controllers
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import AdminHelpOrderController from './app/controllers/AdminHelpOrderController';
// middlewares

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rotas
routes.post('/sessions', SessionController.store);

routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.index);

routes.post(
	'/students/:studentId/help-orders',
	StudentHelpOrderController.store
);
routes.get(
	'/students/:studentId/help-orders',
	StudentHelpOrderController.index
);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:enrollmentId', EnrollmentController.update);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

routes.post(
	'/students/help-orders/:helpOrdersId/answer',
	AdminHelpOrderController.store
);
routes.get('/students/help-orders', AdminHelpOrderController.index);

export default routes;
