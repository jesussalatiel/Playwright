import { Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import { compareToBaseImage, getImagePath } from '../assets/compareImages';

Then('Snapshot {string}', async function (this: ICustomWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: getImagePath(this, name) });
});

Then('Snapshot', async function (this: ICustomWorld) {
  const { page } = this;
  const image = await page?.screenshot();
  this.attach(image, 'image/png');
});

Then('debug', async () => {
  // eslint-disable-next-line no-debugger
  debugger;
});

Then('Screen matches the base image {string}', async function (this: ICustomWorld, name: string) {
  await this.page?.waitForTimeout(1000);
  const screenshot = await this.page!.screenshot();
  await compareToBaseImage(this, name, screenshot as Buffer);
});
