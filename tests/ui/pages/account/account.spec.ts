import { expect, test } from '@fixtures/uiPopupClosed';
import { generateProfileData } from '@utils/formDataGenerator';
import { ExtractReturn } from '@utils/types';
import { Account } from 'src/pages/account/account';
import { Login } from 'src/pages/login/login';

let login: ExtractReturn<typeof Login>;
let account: ExtractReturn<typeof Account>;

test.describe('Account Page', () => {
  test.beforeEach(async ({ page }) => {
    login = Login(page);
    account = Account(page);
    await login.goTo();
    await login.signIn();
    await account.goTo();
  });

  test.afterAll(async ({ page }) => {
    login = Login(page);
    account = Account(page);
    await login.goTo();
    await login.signIn();
    await account.goTo();
    await account.restoreDefaultProfile();
  });

  test('Account data after edit should change', async () => {
    const profileData = generateProfileData();
    await account.goToEditProfileSection();

    const beforeChangeName = account.getEditProfileName();
    const beforeChangeLastName = account.getEditProfileLastName();
    const beforeChangePhone = account.getEditProfilePhone();

    await account.editProfileData(profileData);
    await account.clickOnSaveButton();

    await expect.soft(account.name).not.toHaveText(`${beforeChangeName} ${beforeChangeLastName}`);
    await expect.soft(account.phone).not.toHaveText(`${beforeChangePhone}`);

    await expect.soft(account.name).toHaveText(`${profileData.firstName} ${profileData.lastName}`);
    await expect.soft(account.phone).toContainText(profileData.phoneNumber);
  });
});
