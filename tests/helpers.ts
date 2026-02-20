import { Page } from '@playwright/test';
import crypto from 'crypto';
import path from 'path';
import { pathToFileURL } from 'url';
import * as locators from './locators.json';

export const getFileUrl = () => {
  const file = path.join(__dirname, '..', 'frontend', 'index.html');
  return pathToFileURL(file).toString();
};

export const testID = function () {
    return crypto.randomBytes(4).toString('hex');
};

export const testAge = function () {
    return (Math.floor(Math.random() * 100) + 1).toString();
};

export const testColor = function () {
    const colors = ['red', 'green', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const fillForm = async (page: Page, name: string, age: string, color: string) => {
    await page.fill(locators.nameInput, name);
    await page.fill(locators.ageInput, age);
    await page.selectOption(locators.colorSelect, color);
    await page.check(locators.subscribeCheckbox);
};
