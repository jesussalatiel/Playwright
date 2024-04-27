import { ICustomWorld } from '../../../support/custom-world';
import { TestData } from '../../../support/utils/TestData';
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
    console.log(TestData.transformTableRows(this, table));
  },
);
