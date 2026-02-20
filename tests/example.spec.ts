import { test, expect } from '@playwright/test';
import { getFileUrl, testID, testAge, testColor, fillForm } from './helpers';
import * as locators from './locators.json';

const name = `QA Auto ${testID()}`;
const age = testAge();
const color = testColor();

test('form submission and reset', async ({ page }) => {
  await page.goto(getFileUrl());
  // Fill the form with random data
  await fillForm(page, name, age, color);
  // Submit the form and verify results
  await page.click(locators.submitButton);
  await expect(page.locator(locators.result)).toBeVisible();
  await expect(page.locator(locators.result)).toContainText(name);
  await expect(page.locator(locators.result)).toContainText(age);
  await expect(page.locator(locators.result)).toContainText(color);
  await expect(page.locator(locators.result)).toContainText('Subscribed');
  // Reset the form and verify it is cleared
  await page.click(locators.resetButton);
  await expect(page.locator(locators.nameInput)).toHaveValue('');
  await expect(page.locator(locators.ageInput)).toHaveValue('');
  await expect(page.locator(locators.subscribeCheckbox)).not.toBeChecked();
  await expect(page.locator(locators.result)).toBeHidden();
});

test('counter increment and decrement', async ({ page }) => {
  await page.goto(getFileUrl());
  // Verify initial count is 0
  await expect(page.locator(locators.count)).toHaveText('0');
  // Increment the counter and verify the count updates
  await page.click(locators.incrementBtn);
  await expect(page.locator(locators.count)).toHaveText('1');
  // Increment the counter multiple times and verify the count updates
  await page.click(locators.incrementBtn);
  await page.click(locators.incrementBtn);
  await expect(page.locator(locators.count)).toHaveText('3');
  // Decrement the counter and verify the count updates
  await page.click(locators.decrementBtn);
  await expect(page.locator(locators.count)).toHaveText('2');
  // Decrement the counter multiple times and verify the count updates
  await page.click(locators.decrementBtn);
  await page.click(locators.decrementBtn);
  await page.click(locators.decrementBtn);
  await expect(page.locator(locators.count)).toHaveText('-1');
});

test('search functionality', async ({ page }) => {
  await page.goto(getFileUrl());
  // Perform a search and verify results
  await page.fill(locators.searchInput, 'apple');
  await page.click(locators.searchButton);
  // Verify the search results and message
  await expect(page.locator(locators.searchResults)).not.toBeHidden();
  await expect(page.locator(locators.searchMessage)).toContainText('Found 1 result(s)');
  // Verify the specific search result is visible
  const appleItem = page.locator(`${locators.searchResults} li:has-text("Apple")`);
  await expect(appleItem).toBeVisible();
  // Verify that non-matching items are not visible
  const bananaItem = page.locator(`${locators.searchResults} li:has-text("Banana")`);
  await expect(bananaItem).toBeHidden();
});

test('search no results', async ({ page }) => {
  await page.goto(getFileUrl());
  // Perform a search with no matching results
  await page.fill(locators.searchInput, 'xyz123');
  await page.click(locators.searchButton);
  // Verify that no results are found and the appropriate message is displayed
  await expect(page.locator(locators.searchResults)).toBeHidden();
  await expect(page.locator(locators.searchMessage)).toContainText('No results found');
});

test('search multiple results', async ({ page }) => {
  await page.goto(getFileUrl());
  // Perform a search that matches multiple items
  await page.fill(locators.searchInput, 'e');
  await page.click(locators.searchButton);
  // Verify that multiple results are found and the appropriate message is displayed
  await expect(page.locator(locators.searchMessage)).toContainText('Found 4 result(s)');
  const items = page.locator(`${locators.searchResults} li`);
  await expect(items).toHaveCount(5);
});

test('search clear', async ({ page }) => {
  await page.goto(getFileUrl());
  // Perform a search and then clear it
  await page.fill(locators.searchInput, 'apple');
  await page.click(locators.searchButton);
  await expect(page.locator(locators.searchResults)).not.toBeHidden();
  // Clear the search input and verify results are hidden
  await page.fill(locators.searchInput, '');
  await page.click(locators.searchButton);
  // Verify that search results are hidden and message is cleared
  await expect(page.locator(locators.searchResults)).toBeHidden();
  await expect(page.locator(locators.searchMessage)).toHaveText('');
});

test('todo add and delete', async ({ page }) => {
  await page.goto(getFileUrl());
  // Add a todo item and verify it appears in the list
  await page.fill(locators.todoInput, 'Buy milk');
  await page.click(locators.addTodoBtn);
  // Verify the todo item is added to the list
  let todoItems = page.locator(locators.todoItem);
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Buy milk');
  // Add another todo item and verify both items are in the list
  await page.fill(locators.todoInput, 'Walk the dog');
  await page.click(locators.addTodoBtn);
  // Verify both todo items are present
  todoItems = page.locator(locators.todoItem);
  await expect(todoItems).toHaveCount(2);
  // Delete the first todo item and verify it is removed from the list
  const deleteBtn = todoItems.first().locator(locators.deleteBtn);
  await deleteBtn.click();
  // Verify the first todo item is deleted and the second item remains
  todoItems = page.locator(locators.todoItem);
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Walk the dog');
});

test('todo add with Enter key', async ({ page }) => {
  await page.goto(getFileUrl());
  // Add a todo item using the Enter key and verify it appears in the list
  await page.fill(locators.todoInput, 'Complete project');
  await page.press(locators.todoInput, 'Enter');
  // Verify the todo item is added to the list and the input is cleared
  const todoItems = page.locator(locators.todoItem);
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Complete project');
  await expect(page.locator(locators.todoInput)).toHaveValue('');
});

test('todo empty input ignored', async ({ page }) => {
  await page.goto(getFileUrl());
  // Attempt to add a todo item with empty input and verify it is not added to the list
  await page.fill(locators.todoInput, '   ');
  await page.click(locators.addTodoBtn);
  // Verify that no todo items are added to the list
  const todoItems = page.locator(locators.todoItem);
  await expect(todoItems).toHaveCount(0);
});

test('counter affects form result', async ({ page }) => {
  await page.goto(getFileUrl());
  // Increment the counter a few times and then submit the form to verify the count is included in the result
  await page.click(locators.incrementBtn);
  await page.click(locators.incrementBtn);
  await page.click(locators.incrementBtn);
  // Fill the form with random data and submit
  await page.fill(locators.nameInput, 'Alice');
  await page.click(locators.submitButton);
  // Verify that the count from the counter is included in the form submission result
  await expect(page.locator(locators.result)).toContainText('Count: 3');
});
