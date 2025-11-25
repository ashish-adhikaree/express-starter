import UploadController from '@/controllers/upload';
import { validateBody } from '@/validators';
import { GenerateSASBodySchema } from '@/validators/schemas/upload';
import { Router } from 'express';

const UploadRouter: Router = Router();

UploadRouter.post('/generate-blob-sas', validateBody(GenerateSASBodySchema), UploadController.generateBlobSAS);

export default UploadRouter;
