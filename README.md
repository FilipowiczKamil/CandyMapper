# CandyMapper Automation Tests

## Overview

End-to-end test automation for [candymapper.com](https://candymapper.com), built using **Playwright** and **TypeScript**, following the **Page Object Pattern**. The project focuses on component-based testing and full page coverage across different viewport sizes (desktop, tablet, mobile) on chrome browser.

## Setup and Installation

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version 18.x or higher recommended)
- npm (version 9.x or higher recommended)

### Getting Started

1. **Clone the Repository**

   Clone the repository to your local machine using:

```bash
git clone https://github.com/FilipowiczKamil/CandyMapper.git
```

2. **Install Dependencies**

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

3. **Install Playwright Browsers**

Navigate to the project directory and install the required dependencies:

```bash
npx playwright install
```

## Structure

- `src/` : Contains the source code of the application
- `tests/` : Contains test files
- `src/components` : Contains reusable components
- `src/fixtures` : Contains fixtures to use when needed
- `src/pages` : Contains pages
- `src/utils` : Contains helper functions

## How to run tests

Run all tests
```bash
npm test
```

