# Page Object Model (POM) in Playwright

This project uses the **Page Object Model** pattern to organize test code. This is a best practice in automated testing that makes the code more maintainable and scalable.

## Project Structure

```
tests/
├── pages/                 # Page Object Model classes
│   ├── basePage.ts       # Base class with standard methods
│   ├── mainPage.ts       # Page object with interaction methods
│   └── index.ts          # Export all page objects
├── helpers.ts            # Utilities and helper functions
├── locators.json         # HTML element selectors
└── example.spec.ts       # Tests using POM
```

## Component Description

### 1. BasePage (Base Class)

`BasePage` is a base class that contains common methods for all page objects:

```typescript
export class BasePage {
  protected readonly page: Page;
  
  async click(selector: string)
  async fill(selector: string, value: string)
  async check(selector: string)
  async selectOption(selector: string, value: string)
  async isVisible(selector: string)
  // ... and other base methods
}
```

**Benefits:**
- Centralized management of browser operations
- Simplified code reuse
- Easier to change interaction methods

### 2. MainPage (Page Object)

`MainPage` is a class that extends `BasePage` and contains methods specific to the tested page:

```typescript
export class MainPage extends BasePage {
  // Form methods
  async fillForm(name: string, age: string, color: string, subscribe?: boolean)
  async submitForm()
  async resetForm()
  
  // Counter methods
  async incrementCounter()
  async decrementCounter()
  
  // Search methods
  async performSearch(query: string)
  async clearSearch()
  
  // Todo list methods
  async addTodo(taskText: string)
  async deleteTodo(index: number)
}
```

**Method Structure:**
- **Action methods** - perform actions (click, fill, submit)
- **Validation methods** - verify element states (expect)

### 3. Tests Using POM

Tests are now significantly more readable and logical:

#### Without POM (old way):
```typescript
test('form submission', async ({ page }) => {
  await page.goto(url);
  await page.fill('#name', 'John');
  await page.fill('#age', '30');
  await page.selectOption('#color', 'blue');
  await page.check('#subscribe');
  await page.click('#submitBtn');
  await expect(page.locator('#result')).toBeVisible();
  await expect(page.locator('#result')).toContainText('John');
});
```

#### With POM (new way):
```typescript
test('form submission', async () => {
  const mainPage = new MainPage(page);
  
  await mainPage.fillForm('John', '30', 'blue', true);
  await mainPage.submitForm();
  await mainPage.expectResultVisible();
  await mainPage.expectResultContains('John');
});
```

## Page Object Model Benefits

1. **Maintainability** - easier to update selectors in one place
2. **Readability** - tests read like business scenarios
3. **Reusability** - methods can be reused across different tests
4. **Scalability** - easier to add new page objects and methods
5. **Decoupling** - tests are independent of HTML selectors
6. **Documentation** - page object methods serve as documentation

## How to Use

### Creating a New Page Object

```typescript
import { BasePage } from './basePage';

export class MyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async performAction() {
    // implementation
  }

  async expectSomething() {
    // assertion
  }
}
```

### Using in Tests

```typescript
import { test } from '@playwright/test';
import { MyPage } from './pages/myPage';

test.beforeEach(async ({ page }) => {
  myPage = new MyPage(page);
  await myPage.goto('https://...');
});

test('my test', async () => {
  await myPage.performAction();
  await myPage.expectSomething();
});
```

## Locators (locators.json)

All selectors are stored in `locators.json`:

```json
{
  "nameInput": "#name",
  "submitButton": "#submitBtn",
  "result": "#result"
}
```

**Best Practices:**
- Use IDs for unique elements
- Use classes for repeating elements
- Avoid XPath when possible
- Periodically verify selector relevance

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test
npx playwright test --grep "form submission"

# Run in interactive mode
npx playwright test --debug

# View the report
npx playwright show-report
```

## Checklist for Adding New Features

- [ ] Add selectors to `locators.json`
- [ ] Create action methods in page object
- [ ] Create assertion methods in page object
- [ ] Write tests using new methods
- [ ] Ensure all tests pass
- [ ] Update documentation
