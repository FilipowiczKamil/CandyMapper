import { Locator } from '@playwright/test';

export const scrollToElement = async (elem: Locator): Promise<void> => {
  await elem.scrollIntoViewIfNeeded();
};
export const getText = async (elem: Locator): Promise<string> => {
  return await elem.innerText();
};
export const removeSpaces = (str: string): string => {
  return str.replace(/\s+/g, '');
};
