import { test, expect } from '@playwright/test';
import { getFileUrl, testID, testAge, testColor } from './helpers';
import { MainPage } from './pages';
import * as locators from './locators.json';

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto(getFileUrl());
});

test('form submission and reset', async () => {
  const name = `QA Auto ${testID()}`;
  const age = testAge();
  const color = testColor();

  // Fill the form with random data
  await mainPage.fillForm(name, age, color, true);
  // Submit the form and verify results
  await mainPage.submitForm();
  await mainPage.expectResultVisible();
  await mainPage.expectResultContains(name);
  await mainPage.expectResultContains(age);
  await mainPage.expectResultContains(color);
  await mainPage.expectResultContains('Subscribed');
  
  // Reset the form and verify it is cleared
  await mainPage.resetForm();
  await mainPage.expectNameInputEmpty();
  await mainPage.expectAgeInputEmpty();
  await mainPage.expectSubscribeUnchecked();
  await mainPage.expectResultHidden();
});

test('counter increment and decrement', async () => {
  // Verify initial count is 0
  await mainPage.expectCounterValue('0');
  
  // Increment the counter and verify the count updates
  await mainPage.incrementCounter();
  await mainPage.expectCounterValue('1');
  
  // Increment the counter multiple times and verify the count updates
  await mainPage.incrementCounter();
  await mainPage.incrementCounter();
  await mainPage.expectCounterValue('3');
  
  // Decrement the counter and verify the count updates
  await mainPage.decrementCounter();
  await mainPage.expectCounterValue('2');
  
  // Decrement the counter multiple times and verify the count updates
  await mainPage.decrementCounter();
  await mainPage.decrementCounter();
  await mainPage.decrementCounter();
  await mainPage.expectCounterValue('-1');
});

test('search functionality', async () => {
  // Perform a search and verify results
  await mainPage.performSearch('apple');
  // Verify the search results and message
  await mainPage.expectSearchResultsVisible();
  await mainPage.expectSearchMessageContains('Found 1 result(s)');
  // Verify the specific search result is visible
  await mainPage.expectSearchItemVisible('Apple');
  // Verify that non-matching items are not visible
  await mainPage.expectSearchItemHidden('Banana');
});

test('search no results', async () => {
  // Perform a search with no matching results
  await mainPage.performSearch('xyz123');
  // Verify that no results are found and the appropriate message is displayed
  await mainPage.expectSearchResultsHidden();
  await mainPage.expectSearchMessageContains('No results found');
});

test('search multiple results', async () => {
  // Perform a search that matches multiple items
  await mainPage.performSearch('e');
  // Verify that multiple results are found and the appropriate message is displayed
  await mainPage.expectSearchMessageContains('Found 4 result(s)');
  await mainPage.expectSearchResultsCount(5);
});

test('search clear', async () => {
  // Perform a search and then clear it
  await mainPage.performSearch('apple');
  await mainPage.expectSearchResultsVisible();
  // Clear the search input and verify results are hidden
  await mainPage.clearSearch();
  // Verify that search results are hidden and message is cleared
  await mainPage.expectSearchResultsHidden();
  await mainPage.expectSearchMessageEmpty();
});

test('todo add and delete', async () => {
  // Add a todo item and verify it appears in the list
  await mainPage.addTodo('Buy milk');
  // Verify the todo item is added to the list
  await mainPage.expectTodoCountBe(1);
  await mainPage.expectTodoItemExists('Buy milk');
  
  // Add another todo item and verify both items are in the list
  await mainPage.addTodo('Walk the dog');
  // Verify both todo items are present
  await mainPage.expectTodoCountBe(2);
  
  // Delete the first todo item and verify it is removed from the list
  await mainPage.deleteTodo(0);
  // Verify the first todo item is deleted and the second item remains
  await mainPage.expectTodoCountBe(1);
  await mainPage.expectTodoItemExists('Walk the dog');
});

test('todo add with Enter key', async ({ page }) => {
  // Add a todo item using the Enter key and verify it appears in the list
  await mainPage.fill(locators.todoInput, 'Complete project');
  await page.press(locators.todoInput, 'Enter');
  // Verify the todo item is added to the list and the input is cleared
  await mainPage.expectTodoCountBe(1);
  await mainPage.expectTodoItemExists('Complete project');
  await expect(page.locator(locators.todoInput)).toHaveValue('');
});

test('todo empty input ignored', async () => {
  // Attempt to add a todo item with empty input and verify it is not added to the list
  await mainPage.fill(locators.todoInput, '   ');
  await mainPage.click(locators.addTodoBtn);
  // Verify that no todo items are added to the list
  await mainPage.expectTodoCountBe(0);
});

test('counter affects form result', async () => {
  // Increment the counter a few times and then submit the form to verify the count is included in the result
  await mainPage.incrementCounter();
  await mainPage.incrementCounter();
  await mainPage.incrementCounter();
  // Fill the form with random data and submit
  await mainPage.fill(locators.nameInput, 'Alice');
  await mainPage.submitForm();
  // Verify that the count from the counter is included in the form submission result
  await mainPage.expectResultContains('Count: 3');
});
