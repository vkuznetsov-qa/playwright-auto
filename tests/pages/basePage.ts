import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async check(selector: string) {
    await this.page.check(selector);
  }

  async uncheck(selector: string) {
    await this.page.uncheck(selector);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async isVisible(selector: string) {
    return await this.page.isVisible(selector);
  }

  async isChecked(selector: string) {
    return await this.page.isChecked(selector);
  }

  async getText(selector: string) {
    return await this.page.textContent(selector);
  }

  async getInputValue(selector: string) {
    return await this.page.inputValue(selector);
  }

  async locator(selector: string) {
    return this.page.locator(selector);
  }
}
