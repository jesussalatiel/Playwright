import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, request, ConsoleMessage, webkit } from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ensureDir } from 'fs-extra';
import { config } from './config';
import { ICustomWorld } from './custom-world';

let browser: any;
const tracesDir = 'traces';

const TIME_OUT_MS = 10 * 1000;

setDefaultTimeout(process.env.PWDEBUG ? -1 : TIME_OUT_MS);

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before({ tags: '@firefox' }, async () => {
  browser = await firefox.launch(config.browserOptions);
  await ensureDir(tracesDir);
});

Before({ tags: '@chrome or @chromium' }, async () => {
  browser = await chromium.launch(config.browserOptions);
  await ensureDir(tracesDir);
});

Before({ tags: '@safari' }, async () => {
  browser = await webkit.launch(config.browserOptions);
  await ensureDir(tracesDir);
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
  });

  this.server = await request.newContext({
    baseURL: config.BASE_API_URL,
  });

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', async (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });

  this.feature = pickle;

  await this.page.goto(config.BASE_URL);
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(`Error: ${result.message}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();

      const timePart = this.startTime?.toISOString().split('.')[0].replaceAll(':', '_');

      this.attach(image, 'image/png');

      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${timePart}trace.zip`,
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
  await browser.close();
});
