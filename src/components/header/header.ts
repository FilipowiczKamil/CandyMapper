import { Page } from '@playwright/test';
import { headerSelectors } from './selectors';

export const Header = (page: Page) => {
  const headerLogo = page.locator(headerSelectors.mainLogo).filter({ visible: true });
  const headerLinkElement = page.locator(headerSelectors.navElement);
  const headerLinkElHyperlink = headerLinkElement.locator('a');
  const navDropdownButton = page
    .locator(headerSelectors.navDropdownButton)
    .filter({ hasText: /more/i });
  const navAccountIcon = page.locator(headerSelectors.accountIconButton).filter({ visible: true });
  const dropdown = page.locator(headerSelectors.dropdown).filter({ visible: true });
  const dropdownElement = dropdown.locator(headerSelectors.dropdownItem);
  const navDropdownElement = dropdown.locator(headerSelectors.navDropdownElement);
  const hamburgerButton = page.locator(headerSelectors.hamburger);
  const mobileNav = page.locator(headerSelectors.mobileNav);
  const mobileNavEl = page.locator(headerSelectors.mobileNavEl);

  const expandNavDropdown = async (): Promise<void> => {
    await navDropdownButton.click();
  };

  const expandAccountDropdown = async (): Promise<void> => {
    await navAccountIcon.click();
  };

  const openMobileNav = async (): Promise<void> => {
    await hamburgerButton.click();
  };

  return {
    headerLinkElHyperlink,
    navDropdownElement,
    headerLinkElement,
    navDropdownButton,
    dropdownElement,
    navAccountIcon,
    mobileNavEl,
    headerLogo,
    mobileNav,
    dropdown,
    openMobileNav,
    expandNavDropdown,
    expandAccountDropdown,
  };
};
