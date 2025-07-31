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
    await expect.soft(footer.menuElement.first()).toBeVisible();
    await expect.soft(footer.businessName).toBeVisible();
    await expect.soft(footer.address).toBeVisible();
    await expect.soft(footer.phone).toBeVisible();
    await expect.soft(footer.copyrights).toBeVisible();
  });

  test('Footer link should return status 200', async ({ page, baseURL }) => {
    await footer.menuElement.nth(1).click();
    const menuElementHref = await getHrefAttr(footer.menuElement.nth(1));
    const response = await page.goto(`${baseURL}${menuElementHref}`);
    expect.soft(response?.status()).toBe(200);
  });
});
