# playwright-auto

Example project of web automation using **Playwright** for Chromium, Firefox, and WebKit browsers.

## 📋 Overview

`playwright-auto` is an example project demonstrating best practices for writing automated tests for web applications using Playwright. The project includes:

- **Frontend application** with interactive elements (form, counter, search, TODO list)
- **Test suite** for functionality verification
- **Helper functions** for working with locators and test data
- **Playwright configuration** for testing across multiple browsers

## 🚀 Quick Start

### Requirements

- Node.js version 22 and above
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vkuznetsov-qa/playwright-auto.git
cd playwright-auto
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 📁 Project Structure

```
playwright-auto/
├── frontend/                 # Frontend application for testing
│   ├── app.js              # Application logic
│   ├── index.html          # HTML markup
│   └── styles.css          # Styles
├── tests/                   # Test scenarios
│   ├── example.spec.ts     # Main tests
│   ├── helpers.ts          # Helper functions
│   └── locators.json       # Element selectors
├── playwright-report/       # Test reports
├── test-results/           # Test results
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project configuration
└── README.md               # This file
```

## 🧪 Running Tests

### All tests
```bash
npx playwright test
```

### Tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Tests with UI
```bash
npx playwright test --headed
```

### Debug tests
```bash
npx playwright test --debug
```

### Run single test
```bash
npx playwright test tests/example.spec.ts
```

## 📊 Reports

After running tests, an HTML report is generated. To view it:

```bash
npx playwright show-report
```

## 🎯 Application Features

The frontend application contains the following components:

### 1. **Form**
- Name input field
- Age input field
- Color selection dropdown
- Subscribe checkbox
- Submit and Reset buttons

### 2. **Counter**
- Increment button
- Decrement button
- Current value display

### 3. **Search**
- Search input field
- Predefined list of items
- Filtering by entered text

### 4. **TODO List**
- Add tasks
- Delete completed tasks
- Display task count

## ⚙️ Configuration

Main Playwright parameters in [playwright.config.ts](playwright.config.ts):

- **testDir**: `./tests` — directory with tests
- **fullyParallel**: `true` — parallel test execution
- **reporter**: `html` — HTML report generation
- **projects**: Testing in Chromium, Firefox, and WebKit browsers

### Element Locators

Element selectors are stored in [tests/locators.json](tests/locators.json):

### Helper Functions

The file [tests/helpers.ts](tests/helpers.ts) contains helper functions for:
- Generating random test data (`testID()`, `testAge()`, `testColor()`)
- Filling forms (`fillForm()`)
- Getting application URL (`getFileUrl()`)

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.
