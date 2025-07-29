import { Page } from '@playwright/test';
import { heroComponent } from 'src/components/hero/hero';

export type homePageType = ReturnType<typeof HomePage>;

export const HomePage = (page: Page) => {
  const hero = heroComponent(page);

  return {
    ...hero,
  };
};
