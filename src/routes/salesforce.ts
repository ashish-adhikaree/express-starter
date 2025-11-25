import SalesforceController from '@/controllers/salesforce';
import { validateBody, validateId } from '@/validators';
import { UpdateMediaItemUrlBodySchema } from '@/validators/schemas/salesforce';
import { Router } from 'express';

const SalesforceRouter: Router = Router();

SalesforceRouter.post('/media/:id/update-url', validateId(), validateBody(UpdateMediaItemUrlBodySchema), SalesforceController.updateMediaItemUrl);

export default SalesforceRouter;
