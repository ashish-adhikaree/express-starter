import SalesforceService from '@/services/salesforce';
import { NextFunction, Request, Response } from 'express';

async function updateMediaItemUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedRecord = await SalesforceService.updateMediaItemUrl(req.params.id!, req.body.url);
    return res.json({ updatedRecord });
  } catch (err) {
    next(err);
  }
}

const SalesforceController = {
  updateMediaItemUrl,
};

export default SalesforceController;
