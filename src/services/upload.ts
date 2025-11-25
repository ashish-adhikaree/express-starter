import env from '@/config/env';
import { GenerateSASBody } from '@/validators/schemas/upload';
import { v4 as uuidv4 } from 'uuid';
import {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import logger from '@/lib/utils/logger';

async function generateBlobSAS({ filename }: GenerateSASBody) {
  const log = logger({
    service: 'UploadService',
    method: 'generateBlobSAS',
    meta: {
      filename,
    },
  });
  log.info('Generating SAS URL for blob upload');
  try {
    const blob = `${uuidv4()}-${filename}`;
    const credential = new StorageSharedKeyCredential(env.ACCOUNT_NAME, env.ACCOUNT_KEY);

    const sas = generateBlobSASQueryParameters(
      {
        containerName: env.CONTAINER,
        blobName: blob,
        permissions: BlobSASPermissions.parse('wc'), // write and create
        startsOn: new Date(Date.now() - 60 * 1000),
        expiresOn: new Date(Date.now() + 60 * 5 * 1000), // 5 minutes
        protocol: SASProtocol.Https,
      },
      credential
    ).toString();

    const sasUrl = `https://${env.ACCOUNT_NAME}.blob.core.windows.net/${env.CONTAINER}/${blob}?${sas}`;

    return sasUrl;
  } catch (error: any) {
    error.meta = { filename };
    error.location = { service: 'UploadService', method: 'generateBlobSAS' };
    throw error;
  }
}

const UploadService = {
  generateBlobSAS,
};

export default UploadService;
