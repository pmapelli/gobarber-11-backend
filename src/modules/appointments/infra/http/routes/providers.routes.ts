import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import ProvidersController from '../controllers/ProvidersController';

const appointmentsRouter = Router();
const providersController = new ProvidersController();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', providersController.create);

export default appointmentsRouter;
