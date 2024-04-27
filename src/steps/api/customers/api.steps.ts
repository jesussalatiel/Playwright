import { ICustomWorld } from '../../../support/custom-world';
import { expect } from '@playwright/test';
import { DataTable, Given } from '@cucumber/cucumber';
import console from 'node:console';

Given('A cat fact is recieved', async function (this: ICustomWorld) {
  const response = await this.server?.get('facts');
  expect(response).toBeDefined();
});

Given(
  'I create a new user with the following information:',
  async function (this: ICustomWorld, table: DataTable) {
    table.hashes().forEach((row) => {
      console.log(row);

      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          const value = row[key];
          const parts: string[] = value.split(':');
          switch (true) {
            case parts.includes('mobile'):
              console.log('-----------');
              console.log(this.mobile);
              break;
            case parts.includes('document_number'):
              console.log(this.identityDocument);
              console.log('-----------');
              break;
            default:
              console.log('default');
          }
        }
      }
    });
  },
);
