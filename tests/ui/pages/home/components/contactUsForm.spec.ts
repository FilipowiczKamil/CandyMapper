/* eslint-disable playwright/expect-expect */
import { ac } from '@faker-js/faker/dist/airline-CLphikKp';
import { expect, test } from '@fixtures/uiPopupClosed';
import { generateContactUsFormData } from '@utils/formDataGenerator';
import { ExtractReturn } from '@utils/types';
import { ContactUsForm } from 'src/components/contactUsForm/contactUsForm';

let elements: ExtractReturn<typeof ContactUsForm>['elements'];
let actions: ExtractReturn<typeof ContactUsForm>['actions'];

test.describe('Contact us form', () => {
  const formData = generateContactUsFormData();
  test.beforeEach(async ({ page }) => {
    elements = ContactUsForm(page).elements;
    actions = ContactUsForm(page).actions;
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await actions.scrollToContactUs();
  });

  test('Should fill form data and receive success message', async () => {
    await expect
      .soft(elements.contactUsFormWrapper, 'Contact Us form should be visible')
      .toBeVisible();
    await actions.fillForm(formData);
    await actions.submitForm();
    await expect
      .soft(elements.contactUsSuccess, 'Success message should be visible after form submit')
      .toBeVisible();
  });

  test('Filled data should match data in request', async () => {
    await actions.fillForm(formData);
    await actions.submitForm();

    const requestBody = await actions.getFormSendRequestBody();

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

  test('Email field should have validation', async () => {});
});
