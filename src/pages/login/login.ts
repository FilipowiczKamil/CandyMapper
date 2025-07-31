import { Page } from '@playwright/test';
import { loginSelectors } from './selectors';

export const Login = (page: Page) => {
  const loginInput = page.locator(loginSelectors.loginField);
  const passwordInput = page.locator(loginSelectors.passwordField);
  const signInButton = page.locator(loginSelectors.signInButton);
  const resetPasswordButton = page.locator(loginSelectors.resetPasswordButton);
  const createAccountButton = page.locator(loginSelectors.createAccountButton).locator('a');

  const goTo = async () => {
    await page.goto('/m/login');
  };

  const signIn = async () => {
    const username = process.env.CANDY_LOGIN;
    const password = process.env.CANDY_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing USERNAME or PASSWORD in .env');
    }

    await loginInput.fill(username);
    await passwordInput.fill(password);
    await signInButton.click();
  };

  return {
    loginInput,
    passwordInput,
    signInButton,
    resetPasswordButton,
    createAccountButton,
    goTo,
    signIn,
  };
};
