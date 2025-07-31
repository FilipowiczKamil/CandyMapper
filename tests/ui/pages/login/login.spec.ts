import { expect, test } from '@fixtures/uiPopupClosed';
import { ExtractReturn } from '@utils/types';
import { Account } from 'src/pages/account/account';
import { Login } from 'src/pages/login/login';

let login: ExtractReturn<typeof Login>;
let account: ExtractReturn<typeof Account>;

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    login = Login(page);
    account = Account(page);
    await login.goTo();
  });

  test('Should login to account', async () => {
    await login.signIn();
    await account.goTo();

    await expect
      .soft(
        account.heading,
        'Account page should contain heading data that match logged in account',
      )
      .toHaveText(`Hello ${process.env.CANDY_NAME}`);

    await expect
      .soft(account.name, 'Account page should contain name data that match logged in account')
      .toHaveText(`${process.env.CANDY_NAME} ${process.env.CANDY_LAST_NAME}`);

    await expect
      .soft(account.email, 'Account page should contain email data that match logged in account')
      .toContainText(`${process.env.CANDY_LOGIN}`);

    await expect
      .soft(account.phone, 'Account page should contain phone data that match logged in account')
      .toContainText(`${process.env.PHONE}`);
  });
});
