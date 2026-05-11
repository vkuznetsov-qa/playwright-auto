import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import * as locators from '../locators.json';

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ===== Form Actions =====
  async fillForm(name: string, age: string, color: string, subscribe: boolean = false) {
    await this.fill(locators.nameInput, name);
    await this.fill(locators.ageInput, age);
    await this.selectOption(locators.colorSelect, color);
    if (subscribe) {
      await this.check(locators.subscribeCheckbox);
    }
  }

  async submitForm() {
    await this.click(locators.submitButton);
  }

  async resetForm() {
    await this.click(locators.resetButton);
  }

  async getFormResult() {
    return await this.getText(locators.result);
  }

  async isResultVisible() {
    return await this.isVisible(locators.result);
  }

  // ===== Form Validation =====
  async expectNameInputEmpty() {
    await expect(this.page.locator(locators.nameInput)).toHaveValue('');
  }

  async expectAgeInputEmpty() {
    await expect(this.page.locator(locators.ageInput)).toHaveValue('');
  }

  async expectSubscribeUnchecked() {
    await expect(this.page.locator(locators.subscribeCheckbox)).not.toBeChecked();
  }

  async expectResultVisible() {
    await expect(this.page.locator(locators.result)).toBeVisible();
  }

  async expectResultHidden() {
    await expect(this.page.locator(locators.result)).toBeHidden();
  }

  async expectResultContains(text: string) {
    await expect(this.page.locator(locators.result)).toContainText(text);
  }

  // ===== Counter Actions =====
  async incrementCounter() {
    await this.click(locators.incrementBtn);
  }

  async decrementCounter() {
    await this.click(locators.decrementBtn);
  }

  async getCounterValue() {
    return await this.getText(locators.count);
  }

  async expectCounterValue(value: string) {
    await expect(this.page.locator(locators.count)).toHaveText(value);
  }

  // ===== Search Actions =====
  async performSearch(query: string) {
    await this.fill(locators.searchInput, query);
    await this.click(locators.searchButton);
  }

  async clearSearch() {
    await this.fill(locators.searchInput, '');
    await this.click(locators.searchButton);
  }

  async getSearchMessage() {
    return await this.getText(locators.searchMessage);
  }

  async isSearchResultsVisible() {
    return await this.isVisible(locators.searchResults);
  }

  // ===== Search Validation =====
  async expectSearchResultsVisible() {
    await expect(this.page.locator(locators.searchResults)).not.toBeHidden();
  }

  async expectSearchResultsHidden() {
    await expect(this.page.locator(locators.searchResults)).toBeHidden();
  }

  async expectSearchMessageContains(text: string) {
    await expect(this.page.locator(locators.searchMessage)).toContainText(text);
  }

  async expectSearchMessageEmpty() {
    await expect(this.page.locator(locators.searchMessage)).toHaveText('');
  }

  async expectSearchItemVisible(itemText: string) {
    const item = this.page.locator(`${locators.searchResults} li:has-text("${itemText}")`);
    await expect(item).toBeVisible();
  }

  async expectSearchItemHidden(itemText: string) {
    const item = this.page.locator(`${locators.searchResults} li:has-text("${itemText}")`);
    await expect(item).toBeHidden();
  }

  async expectSearchResultsCount(count: number) {
    const items = this.page.locator(`${locators.searchResults} li`);
    await expect(items).toHaveCount(count);
  }

  // ===== Todo Actions =====
  async addTodo(taskText: string) {
    await this.fill(locators.todoInput, taskText);
    await this.click(locators.addTodoBtn);
  }

  async deleteTodo(index: number) {
    const deleteButtons = this.page.locator(locators.deleteBtn);
    await deleteButtons.nth(index).click();
  }

  async getTodoCount() {
    return await this.page.locator(locators.todoItem).count();
  }

  async getTodoText(index: number) {
    return await this.page.locator(`${locators.todoItem} span`).nth(index).textContent();
  }

  // ===== Todo Validation =====
  async expectTodoItemExists(taskText: string) {
    const item = this.page.locator(`${locators.todoItem}:has-text("${taskText}")`);
    await expect(item).toBeVisible();
  }

  async expectTodoItemNotExists(taskText: string) {
    const items = this.page.locator(`${locators.todoItem}:has-text("${taskText}")`);
    await expect(items).toHaveCount(0);
  }

  async expectTodoCountBe(count: number) {
    await expect(this.page.locator(locators.todoItem)).toHaveCount(count);
  }
}
