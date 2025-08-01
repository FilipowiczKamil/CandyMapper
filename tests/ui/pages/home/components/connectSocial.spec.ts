import { expect, test } from '@fixtures/uiPopupClosed';
import { getHrefAttr } from '@utils/helpers';
import { ExtractReturn } from '@utils/types';
import { Home } from 'src/pages/home';

let home: ExtractReturn<typeof Home>;

test.describe('Connect Social', () => {
  test.beforeEach(async ({ page }) => {
    home = Home(page);
    await home.goTo();
    await home.scrollToConnectSocials();
  });

  test('Each social link element should be visible', async () => {
    await expect
      .soft(home.connectSocialsFacebook, 'Facebook social should be visible')
      .toBeVisible();
    await expect
      .soft(home.connectSocialsInstagram, 'Instagram social should be visible')
      .toBeVisible();
    await expect
      .soft(home.connectSocialsLinkedin, 'Linkedin social should be visible')
      .toBeVisible();
    await expect
      .soft(home.connectSocialsPinterest, 'Pinterest social should be visible')
      .toBeVisible();
    await expect.soft(home.connectSocialsX, 'X social should be visible').toBeVisible();
    await expect.soft(home.connectSocialsYouTube, 'Youtube social should be visible').toBeVisible();
  });

  test('Social links should redirect to proper social and return status 200', async () => {
    expect
      .soft(
        await home.getLinkStatus(home.connectSocialsFacebook),
        'Facebook link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await home.getLinkStatus(home.connectSocialsInstagram),
        'Instagram link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await getHrefAttr(home.connectSocialsLinkedin),
        'Linkedin link should contain proper url',
      )
      .toContain('https://www.linkedin.com');
    expect
      .soft(
        await home.getLinkStatus(home.connectSocialsPinterest),
        'Pinterest link should return status 200',
      )
      .toBe(200);
    expect
      .soft(await home.getLinkStatus(home.connectSocialsX), 'X link should return status 200')
      .toBe(200);
    expect
      .soft(
        await home.getLinkStatus(home.connectSocialsYouTube),
        'Youtube link should return status 200',
      )
      .toBe(200);
  });
});
