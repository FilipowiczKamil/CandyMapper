import { expect, test } from '@fixtures/uiPopupClosed';
import { homePageType, HomePage } from 'src/pages/homePage';

let homePage: homePageType;

test.describe('Hero component test', () => {
  test.beforeEach(async ({ page }) => {
    homePage = HomePage(page);
    await page.goto('');
    await homePage.actions.scrollToHero();
  });

  test('Hero main elements should be visible', async () => {
    await expect.soft(homePage.elements.heroDescription).toBeVisible();
    await expect.soft(homePage.elements.heroHeading).toBeVisible();
    await expect.soft(homePage.elements.heroImage).toBeVisible();
    await expect.soft(homePage.elements.heroPhoneLink).toBeVisible();
  });

  test('Visible phone number should match href', async () => {
    const heroNumber = await homePage.actions.getHeroPhoneNumber();

    await expect.soft(homePage.elements.heroPhoneLink).toHaveAttribute('href', `tel:${heroNumber}`);
  });
});
