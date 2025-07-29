import { Page } from '@playwright/test';
import { heroSelectors } from './selectors';
import { removeSpaces } from '@utils/replaceText';

// export type hero = ReturnType<typeof heroComponent>;

export const heroComponent = (page: Page) => {
  const heroComponentWrapper = page.locator(heroSelectors.componentWrapper);
  const heroHeading = page.locator(heroSelectors.heading);
  const heroDescription = page.locator(heroSelectors.description);
  const heroImage = page.locator(heroSelectors.image);
  const heroPhoneLink = page.locator(heroSelectors.phoneLink).locator('a');

  const scrollToHero = async (): Promise<void> => {
    await heroComponentWrapper.scrollIntoViewIfNeeded();
  };

  const getHeroPhoneNumber = async (): Promise<string> => {
    const phoneLink = await heroPhoneLink.innerText();
    return removeSpaces(phoneLink);
  };

  return {
    actions: {
      scrollToHero,
      getHeroPhoneNumber,
    },
    elements: {
      heroHeading,
      heroDescription,
      heroImage,
      heroPhoneLink,
    },
  };
};
