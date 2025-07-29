import { expect, test } from '@fixtures/uiPopupClosed';
import { ExtractReturn } from '@utils/types';
import { ConnectSocials } from 'src/components/connectSocial/connectSocial';

let elements: ExtractReturn<typeof ConnectSocials>['elements'];
let actions: ExtractReturn<typeof ConnectSocials>['actions'];

test.describe('Connect Social', () => {
  test.beforeEach(async ({ page }) => {
    elements = ConnectSocials(page).elements;
    actions = ConnectSocials(page).actions;

    await page.goto('/');
    await actions.scrollToConnectSocials();
  });

  test('Each social link element should be visible', async () => {
    await expect
      .soft(elements.connectSocialsFacebook, 'Facebook social should be visible')
      .toBeVisible();
    await expect
      .soft(elements.connectSocialsInstagram, 'Instagram social should be visible')
      .toBeVisible();
    await expect
      .soft(elements.connectSocialsLinkedin, 'Linkedin social should be visible')
      .toBeVisible();
    await expect
      .soft(elements.connectSocialsPinterest, 'Pinterest social should be visible')
      .toBeVisible();
    await expect.soft(elements.connectSocialsX, 'X social should be visible').toBeVisible();
    await expect
      .soft(elements.connectSocialsYouTube, 'Youtube social should be visible')
      .toBeVisible();
  });

  test('Each social link should redirect to proper social and return status 200', async () => {
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsFacebook),
        'Facebook link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsInstagram),
        'Instagram link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsLinkedin),
        'Linkedin link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsPinterest),
        'Pinterest link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsX),
        'X link should return status 200',
      )
      .toBe(200);
    expect
      .soft(
        await actions.getLinkStatus(elements.connectSocialsYouTube),
        'Youtube link should return status 200',
      )
      .toBe(200);
  });
});
