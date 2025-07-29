import { expect, test } from '@fixtures/uiPopupClosed';
import { ExtractReturn } from '@utils/types';
import { Home } from 'src/pages/homePage';

let actions: ExtractReturn<typeof Home>['actions'];
let elements: ExtractReturn<typeof Home>['elements'];

test.describe('Hero component test', () => {
  test.beforeEach(async ({ page }) => {
    actions = Home(page).actions;
    elements = Home(page).elements;

    await page.goto('/');
    await actions.scrollToHero();
  });

  test('Hero main elements should be visible', async () => {
    await expect.soft(elements.heroDescription, 'Description should be visible').toBeVisible();
    await expect.soft(elements.heroHeading, 'Heading should be visible').toBeVisible();
    await expect.soft(elements.heroImage, 'Image should be visible').toBeVisible();
    await expect.soft(elements.heroPhoneLink, 'Phone link should be visible').toBeVisible();
  });

  test('Visible phone number should match href', async () => {
    const heroNumber = await actions.getHeroPhoneNumber();

    await expect
      .soft(elements.heroPhoneLink, 'Phone link should have proper href attribute')
      .toHaveAttribute('href', `tel:${heroNumber}`);
  });
});
