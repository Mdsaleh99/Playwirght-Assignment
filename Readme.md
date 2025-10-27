### 1. Clone the Repository

```bash
git clone https://github.com/Mdsaleh99/Playwirght-Assignment.git
cd Playwirght-Assignment
```

### 2. Install Dependencies

```bash
npm install
```


### 3. Install Playwright Browsers

```bash
npx playwright install
```

This command downloads the browser binaries (Chromium, Firefox, and WebKit) needed to run tests.

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
OR
npx playwright test --headed --project=chromium
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

