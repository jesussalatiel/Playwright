import { devices } from '@playwright/test';

export const Resolutions = {
  DESKTOP: { width: 1800, height: 1169 },
  MOBILE: devices['iPhone 13'],
  TABLET: devices['iPad Mini'],
};
