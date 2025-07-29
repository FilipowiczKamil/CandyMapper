import { Page } from '@playwright/test';
import { Hero } from 'src/components/hero/hero';

export const Home = (page: Page) => {
  const hero = Hero(page);

  return {
    ...hero,
  };
};
