import { Page } from '@playwright/test';
import { footerSelectors } from './selectors';

export const Footer = (page: Page) => {
  const wrapper = page.locator(footerSelectors.wrapper);
  const menuElement = page.locator(footerSelectors.menuElement);
  const businessName = page.locator(footerSelectors.businessName);
  const address = page.locator(footerSelectors.address);
  const phone = page.locator(footerSelectors.phone);
  const copyrights = page.locator(footerSelectors.copyrights);

  return {
    wrapper,
    menuElement,
    businessName,
    address,
    phone,
    copyrights,
  };
};
