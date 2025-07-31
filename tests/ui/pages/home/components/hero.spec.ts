import { expect, test } from '@fixtures/uiPopupClosed';
import { ExtractReturn } from '@utils/types';
import { Home } from 'src/pages/home';

let home: ExtractReturn<typeof Home>;

test.describe('Hero component test', () => {
  test.beforeEach(async ({ page }) => {
    home = Home(page);
    await home.goTo();
    await home.scrollToHero();
  });

  test('Hero main elements should be visible', async () => {
    await expect.soft(home.heroDescription, 'Description should be visible').toBeVisible();
    await expect.soft(home.heroHeading, 'Heading should be visible').toBeVisible();
    await expect.soft(home.heroImage, 'Image should be visible').toBeVisible();
    await expect.soft(home.heroPhoneLink, 'Phone link should be visible').toBeVisible();
  });

  test('Visible phone number should match href', async () => {
    const heroNumber = await home.getHeroPhoneNumber();

    await expect
      .soft(home.heroPhoneLink, 'Phone link should have proper href attribute')
      .toHaveAttribute('href', `tel:${heroNumber}`);
  });
});
