import { Page } from '@playwright/test';
import { heroSelectors } from './selectors';
import { getText, removeSpaces, scrollToElement } from '@utils/helpers';

export const Hero = (page: Page) => {
  const heroComponentWrapper = page.locator(heroSelectors.componentWrapper);
  const heroHeading = page.locator(heroSelectors.heading);
  const heroDescription = page.locator(heroSelectors.description);
  const heroImage = page.locator(heroSelectors.image);
  const heroPhoneLink = page.locator(heroSelectors.phoneLink).locator('a');

  const scrollToHero = async (): Promise<void> => {
    await scrollToElement(heroComponentWrapper);
  };

  const getHeroPhoneNumber = async (): Promise<string> => {
    return removeSpaces(await getText(heroPhoneLink));
  };

  return {
    scrollToHero,
    getHeroPhoneNumber,
    heroHeading,
    heroDescription,
    heroImage,
    heroPhoneLink,
  };
};
