import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';
import { TestData } from '../assets/TestData';

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;

  testName?: string;
  startTime?: Date;

  server?: APIRequestContext;

  playwrightOptions?: PlaywrightTestOptions;

  identityDocument: string;
  mobile: string;
}

export class CustomWorld extends World implements ICustomWorld {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(options: IWorldOptions) {
    super(options);
  }

  debug = false;

  identityDocument = TestData.setDocumentNumber();

  mobile = TestData.setMobilePhoneNumber();
}

setWorldConstructor(CustomWorld);
