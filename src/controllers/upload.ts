import UploadService from '@/services/upload';
import { NextFunction, Request, Response } from 'express';

async function generateBlobSAS(req: Request, res: Response, next: NextFunction) {
  try {
    const sasUrl = await UploadService.generateBlobSAS(req.body);
    return res.json({ sasUrl });
  } catch (err) {
		next(err);
	}
}

const UploadController = {
  generateBlobSAS,
};

export default UploadController;
