import { Page } from '@playwright/test';
import { contactUsFormSelectors } from './selectors';
import { scrollToElement } from '@utils/helpers';
import { ContactFormField, ContactPayload } from './contactUsModel';

export const ContactUsForm = (page: Page) => {
  const contactUsFormWrapper = page.locator(contactUsFormSelectors.contactUsWrapper);
  const contactUsFirstName = page.locator(contactUsFormSelectors.firstName);
  const contactUsLastName = page.locator(contactUsFormSelectors.lastName);
  const contactUsEmail = page.locator(contactUsFormSelectors.email);
  const contactUsPhone = page.locator(contactUsFormSelectors.number);
  const contactUsMessage = page.locator(contactUsFormSelectors.message);
  const contactUsSubmit = page.getByRole('button', { name: 'submit' });
  const contactUsSuccess = page.locator(contactUsFormSelectors.successMessage);
  const contactUsValidationMes = page.locator(contactUsFormSelectors.emailValidationMessage);

  const scrollToContactUs = async (): Promise<void> => {
    await scrollToElement(contactUsFormWrapper);
  };

  const fillForm = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
  }): Promise<void> => {
    await contactUsFirstName.click({ delay: 500 });
    await contactUsFirstName.fill(data.firstName);
    await contactUsLastName.fill(data.lastName);
    await contactUsEmail.fill(data.email);
    await contactUsPhone.fill(data.phoneNumber);
    await contactUsMessage.fill(data.message);
  };

  const getFormSendRequestBody = async () => {
    const request = page.waitForRequest(
      (req) => req.url().includes('/v3/messages') && req.method() === 'POST',
    );
    const payload = (await request).postDataJSON() as ContactPayload;

    const getValue = (label: ContactFormField['label']) =>
      payload.formData.find((f) => f.label === label)?.value;

    const name = getValue('First Name');
    const lastName = getValue('Last Name');
    const email = getValue('Email');
    const phoneNumber = getValue(
      'By entering a Phone Number you agree to our SMS Terms of Service',
    );
    const message = getValue('Message');
    return { name, lastName, email, phoneNumber, message };
  };

  const submitForm = async (): Promise<void> => {
    await page.waitForResponse((resp) => {
      return (
        resp.url().includes('/element/log?format=json&hasfast=true&authuser=0') &&
        resp.status() === 200
      );
    });
    await contactUsSubmit.click({ force: true });
  };

  return {
    elements: {
      contactUsValidationMes,
      contactUsFormWrapper,
      contactUsFirstName,
      contactUsLastName,
      contactUsEmail,
      contactUsPhone,
      contactUsMessage,
      contactUsSubmit,
      contactUsSuccess,
    },
    actions: {
      fillForm,
      submitForm,
      scrollToContactUs,
      getFormSendRequestBody,
    },
  };
};
