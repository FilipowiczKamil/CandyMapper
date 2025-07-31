import { expect, test } from '@fixtures/uiPopupClosed';
import { generateContactUsFormData } from '@utils/formDataGenerator';
import { ExtractReturn } from '@utils/types';
import { Home } from 'src/pages/home';

let home: ExtractReturn<typeof Home>;

test.describe('Contact us form', () => {
  const formData = generateContactUsFormData();
  test.beforeEach(async ({ page }) => {
    home = Home(page);
    await home.goTo();
    await page.waitForLoadState('domcontentloaded');
    await home.scrollToContactUs();
  });

  test('Should fill form data and receive success message', async () => {
    await expect.soft(home.contactUsFormWrapper, 'Contact Us form should be visible').toBeVisible();
    await home.fillForm(formData);
    await home.submitForm();
    await home.contactUsSuccess.waitFor({ state: 'visible' });
    await expect
      .soft(home.contactUsSuccess, 'Success message should be visible after form submit')
      .toBeVisible();
  });

  test('Filled data should match data in request', async () => {
    await home.fillForm(formData);
    await home.submitForm();

    const requestBody = await home.getFormSendRequestBody();

    expect
      .soft(requestBody.email, 'Request body should contain the same mail as entered in form')
      .toBe(formData.email);

    expect
      .soft(
        requestBody.lastName,
        'Request body should contain the same lastName as entered in form',
      )
      .toBe(formData.lastName);

    expect
      .soft(requestBody.message, 'Request body should contain the same message as entered in form')
      .toBe(formData.message);

    expect
      .soft(requestBody.name, 'Request body should contain the same firstName as entered in form')
      .toBe(formData.firstName);

    expect
      .soft(
        requestBody.phoneNumber,
        'Request body should contain the same phoneNumber as entered in form',
      )
      .toBe(formData.phoneNumber);
  });

  test('Email field should have validation', async () => {
    await home.submitForm();
    await expect
      .soft(
        home.contactUsValidationMes,
        'Validation message should be visible if email is not entered',
      )
      .toBeVisible();

    await expect
      .soft(home.contactUsValidationMes)
      .toHaveText('Please enter a valid email address.');

    await home.contactUsEmail.fill('test');
    await home.contactUsSubmit.click();

    await expect
      .soft(
        home.contactUsValidationMes,
        'Validation message should be visible if entered email is not valid',
      )
      .toBeVisible();

    await expect
      .soft(home.contactUsValidationMes)
      .toHaveText('Please enter a valid email address.');
  });
});
