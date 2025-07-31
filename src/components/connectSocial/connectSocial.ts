import { Locator, Page } from '@playwright/test';
import { connectSocialSelectors } from './selectors';
import { scrollToElement } from '@utils/helpers';

export const ConnectSocials = (page: Page) => {
  const connectSocialsWrapper = page.locator(connectSocialSelectors.componentWrapper);
  const connectSocialsLinksWrapper = page.locator(connectSocialSelectors.socialLinksWrapper);
  const connectSocialsFacebook = page.locator(connectSocialSelectors.facebookLink);
  const connectSocialsInstagram = page.locator(connectSocialSelectors.instagramLink);
  const connectSocialsLinkedin = page.locator(connectSocialSelectors.linkedinLink);
  const connectSocialsPinterest = page.locator(connectSocialSelectors.pinterestLink);
  const connectSocialsX = page.locator(connectSocialSelectors.xLink);
  const connectSocialsYouTube = page.locator(connectSocialSelectors.youtubeLink);

  const scrollToConnectSocials = async () => {
    await scrollToElement(connectSocialsLinksWrapper);
  };

  const getLinkStatus = async (selector: Locator): Promise<number | null> => {
    const href = await selector.getAttribute('href');
    if (!href) return null;

    const browser = selector.page().context().browser();
    if (!browser) return null;

    const context = await browser.newContext();
    const page = await context.newPage();
    const status = (await page.goto(href, { waitUntil: 'domcontentloaded' }))?.status() ?? 0;

    await context.close();
    return status;
  };

  return {
    connectSocialsWrapper,
    connectSocialsLinksWrapper,
    connectSocialsFacebook,
    connectSocialsInstagram,
    connectSocialsLinkedin,
    connectSocialsPinterest,
    connectSocialsX,
    connectSocialsYouTube,

    scrollToConnectSocials,
    getLinkStatus,
  };
};
