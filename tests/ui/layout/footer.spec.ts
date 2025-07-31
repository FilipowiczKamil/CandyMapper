import { expect, test } from '@fixtures/uiPopupClosed';
import { getHrefAttr } from '@utils/helpers';
import { ExtractReturn } from '@utils/types';
import { Footer } from 'src/components/footer/footer';

let footer: ExtractReturn<typeof Footer>;

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    footer = Footer(page);
    await page.goto('/');
  });

  test('Footer elements should be visible', async () => {
    await expect
      .soft(footer.menuElement.first(), 'Menu link elements should be visible')
      .toBeVisible();
    await expect.soft(footer.businessName, 'Business name should be visible ').toBeVisible();
    await expect.soft(footer.address, 'Address field should be visible').toBeVisible();
    await expect.soft(footer.phone, 'Phone number should be visible').toBeVisible();
    await expect.soft(footer.copyrights, 'Copyrights text should be visible').toBeVisible();
  });

  test('Footer link should return status 200', async ({ page, baseURL }) => {
    await footer.menuElement.nth(1).click();
    const menuElementHref = await getHrefAttr(footer.menuElement.nth(1));
    const response = await page.goto(`${baseURL}${menuElementHref}`);
    expect
      .soft(response?.status(), `Page ${baseURL}${menuElementHref} should return status 200`)
      .toBe(200);
  });
});
