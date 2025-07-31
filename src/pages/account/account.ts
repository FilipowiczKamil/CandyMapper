import { Page } from '@playwright/test';
import { accountSelectors } from './selectors';
import { getText } from '@utils/helpers';

export const Account = (page: Page) => {
  const heading = page.locator(accountSelectors.heading);
  const name = page.locator(accountSelectors.nameHeading);
  const email = page.locator(accountSelectors.email);
  const phone = page.locator(accountSelectors.phone);
  const editProfileButton = page.locator(accountSelectors.editProfileButton);

  const goTo = async () => {
    await page.goto('/m/account');
  };

  const getAccountHeading = async () => {
    return await getText(heading);
  };

  const getAccountName = async () => {
    return await getText(name);
  };

  const getAccountEmail = async () => {
    return await getText(email);
  };

  const getAccountPhone = async () => {
    return await getText(phone);
  };

  const goToEditProfileSection = async () => {
    await editProfileButton.click();
  };

  return {
    heading,
    name,
    email,
    phone,
    editProfileButton,
    goTo,
    getAccountHeading,
    getAccountName,
    getAccountEmail,
    getAccountPhone,
    goToEditProfileSection,
  };
};
