import { expect, test } from '@fixtures/uiPopupClosed';
import { getHrefAttr } from '@utils/helpers';
import { ExtractReturn } from '@utils/types';
import { Header } from 'src/components/header/header';

let header: ExtractReturn<typeof Header>;

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    header = Header(page);
  });

  test('Header elements should be visible Desktop', async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop', 'Only desktop test');
    await expect.soft(header.headerLogo).toBeVisible();
    await expect.soft(header.headerLinkElement.first()).toBeVisible();
    await header.expandNavDropdown();
    await expect.soft(header.dropdown).toBeVisible();
    await header.expandAccountDropdown();
    await expect.soft(header.dropdownElement.first()).toBeVisible();
  });

  test('Header link should return status 200 Desktop', async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop', 'Only desktop test');
    const menuElementHref = await getHrefAttr(header.headerLinkElHyperlink.nth(1));
    const response = await page.goto(`${baseURL}${menuElementHref}`);
    expect.soft(response?.status()).toBe(200);
  });

  test('Header elements should be visible Tablet/Mobile', async ({}, testInfo) => {
    test.skip(testInfo.project.name === 'Desktop', 'Only mobile test');
    await expect.soft(header.headerLogo).toBeVisible();
    await expect.soft(header.mobileNav).toBeHidden();
    await header.openMobileNav();
    await expect.soft(header.mobileNav).toBeVisible();
    await expect.soft(header.mobileNavEl.first()).toBeVisible();
  });

  test('Header link should return status 200 Tablet/Mobile', async ({
    page,
    baseURL,
  }, testInfo) => {
    test.skip(testInfo.project.name === 'Desktop', 'Only mobile test');
    await header.openMobileNav();
    await expect.soft(header.mobileNav).toBeVisible();
    const menuElementHref = await getHrefAttr(header.mobileNavEl.nth(0));
    const response = await page.goto(`${baseURL}${menuElementHref}`);
    expect.soft(response?.status()).toBe(200);
  });
});
