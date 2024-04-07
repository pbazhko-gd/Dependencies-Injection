import { Logger } from './logger';
import type { ApiConfig } from '../types';

export class HTTP {
  logger: Logger;
  apiConfig: ApiConfig;

  static $inject = ['logger', 'apiConfig'];

  constructor(logger: Logger, apiConfig: ApiConfig) {
    this.logger = logger;
    this.apiConfig = apiConfig;
  }

  async get(url: string) {
    const response = await fetch(`${this.apiConfig.path}${url}`);

    if (response.ok) {
      const responseData = await response.json();
      this.logger.info(`Status: ${response.status}. Response: ${JSON.stringify(responseData)}`);

      return responseData;
    } else {
      this.logger.error(`Status: ${response.status}. Status Text: ${response.statusText}`);
    }
  }
}
