import axios from 'axios';
import env from '@/config/env';
import logger from '@/lib/utils/logger';

async function updateMediaItemUrl(mediaItemId: string, url: string) {
  const log = logger({ service: 'SalesforceService', method: 'updateMediaItemUrl', meta: { mediaItemId, url } });
  log.info('Updating media item URL in Salesforce');
  try {
    const endpoint = `${env.SALESFORCE_INSTANCE_URL}/services/data/${env.SALESFORCE_API_VERSION}/sobjects/${env.SALESFORCE_MEDIA_SOBJECT}/${mediaItemId}`;

    const payload: Record<string, unknown> = {};
    payload['CDN_URL__c'] = url;
    payload['Status__c'] = 'Completed';

    log.info('Sending PATCH to Salesforce', { endpoint });

    const response = await axios.patch(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${env.SALESFORCE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    log.info('Salesforce update response', { status: response.status });

    // Salesforce returns 204 No Content on successful update. Return a minimal object for the controller.
    if (response.status === 204) {
      return { id: mediaItemId, url };
    }

    return response.data;
  } catch (error: any) {
    error.meta = { mediaItemId, url };
    error.location = { service: 'SalesforceService', method: 'updateMediaItemUrl' };
    throw error;
  }
}

const SalesforceService = {
  updateMediaItemUrl,
};

export default SalesforceService;
