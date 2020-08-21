import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabitityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabitityController from '../controllers/ProviderDayAvailabilityController';

const appointmentsRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabitityController = new ProviderMonthAvailabitityController();
const providerDayAvailabitityController = new ProviderDayAvailabitityController();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', providersController.create);
appointmentsRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabitityController.create,
);
appointmentsRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabitityController.create,
);

export default appointmentsRouter;
