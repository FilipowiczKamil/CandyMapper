import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page, context }, use) => {
    await context.addCookies([
      {
        name: 'wam_widgets_popup_closed_76352d1c-54a1-4246-842d-f836e821472d_1740062023171',
        value: 'true',
        domain: 'candymapper.com',
        path: '/',
      },
    ]);
    await use(page);
  },
});
export { expect, test };
