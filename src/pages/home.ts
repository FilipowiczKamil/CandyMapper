import { Page } from '@playwright/test';
import { ConnectSocials } from 'src/components/connectSocial/connectSocial';
import { ContactUsForm } from 'src/components/contactUsForm/contactUsForm';
import { Hero } from 'src/components/hero/hero';

export const Home = (page: Page) => {
  const hero = Hero(page);
  const connectSocial = ConnectSocials(page);
  const contactUs = ContactUsForm(page);

  const goTo = async () => {
    await page.goto('/');
  };

  return {
    goTo,
    ...hero,
    ...connectSocial,
    ...contactUs,
  };
};
