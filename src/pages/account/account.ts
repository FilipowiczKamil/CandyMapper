import { Page } from '@playwright/test';
import { accountSelectors } from './selectors';
import { getText } from '@utils/helpers';

export const Account = (page: Page) => {
  const heading = page.locator(accountSelectors.heading);
  const name = page.locator(accountSelectors.nameHeading);
  const email = page.locator(accountSelectors.email);
  const phone = page.locator(accountSelectors.phone);
  const editProfileButton = page.locator(accountSelectors.editProfileButton).locator('a');
  const editProfileName = page.locator(accountSelectors.editProfileName);
  const editProfileLastName = page.locator(accountSelectors.editProfileLastName);
  const editProfilePhone = page.locator(accountSelectors.editProfileNumber);
  const editProfileSave = page.locator(accountSelectors.editProfileSaveButton, {
    hasText: /save/i,
  });

  const goTo = async () => {
    await page.goto('/m/account');
  };

  const getAccountHeading = async (): Promise<string> => {
    return await getText(heading);
  };

  const getAccountName = async (): Promise<string> => {
    return await getText(name);
  };

  const getAccountEmail = async (): Promise<string> => {
    return await getText(email);
  };

  const getAccountPhone = async (): Promise<string> => {
    return await getText(phone);
  };

  const goToEditProfileSection = async (): Promise<void> => {
    await editProfileButton.click();
  };

  const getEditProfileName = async (): Promise<string> => {
    return await getText(editProfileName);
  };

  const getEditProfileLastName = async (): Promise<string> => {
    return await getText(editProfileLastName);
  };

  const getEditProfilePhone = async (): Promise<string> => {
    return await getText(editProfilePhone);
  };

  const clickOnSaveButton = async (): Promise<void> => {
    await editProfileSave.click();
  };

  const editProfileData = async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<void> => {
    await editProfileName.fill(data.firstName);
    await editProfileLastName.fill(data.lastName);
    await editProfilePhone.fill(data.phoneNumber);
  };

  const restoreDefaultProfile = async (): Promise<void> => {
    await goToEditProfileSection();
    const name = process.env.CANDY_NAME;
    const lastName = process.env.CANDY_LAST_NAME;
    const phone = process.env.PHONE;

    if (!name || !lastName || !phone) {
      throw new Error('Missing USERNAME or PASSWORD in .env');
    }

    await editProfileName.fill(name);
    await editProfileLastName.fill(lastName);
    await editProfilePhone.fill(phone);

    await clickOnSaveButton();
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
    getEditProfileName,
    getEditProfileLastName,
    getEditProfilePhone,
    clickOnSaveButton,
    editProfileData,
    restoreDefaultProfile,
  };
};
