QA Assessment – Manual Testing, API Testing & Automation Testing

Prepared By: Bhupendra Sen
Date: 13 August 2026
Role: Software Quality Assurance Engineer

1. Overview

This repository contains the complete QA assessment covering Manual Testing, API Testing, and UI Automation Testing.

The assessment demonstrates practical experience in:

Test scenario and test case design
Functional and negative testing
API testing using Postman
Authentication and environment variables
Automated API assertions
UI automation using Playwright with TypeScript
Page Object Model (POM)
Test assertions and synchronization
Failure screenshot configuration
Test documentation and reporting
Assessment Tasks
Task	Area	Tool / Technology
Task 1	Manual Testing	Manual Testing / Test Documentation
Task 2	API Testing	Postman
Task 3	UI Automation	Playwright + TypeScript
2. Task 1 – Manual Testing
2.1 Objective

The objective of Task 1 was to perform manual testing of the assigned application and identify functional scenarios, validate expected behavior, and document defects where applicable.

The testing focused on creating structured test scenarios and test cases covering positive, negative, boundary, and validation conditions.

2.2 Testing Activities

The following activities were performed:

Analyzed application requirements and functionality
Identified positive and negative test scenarios
Created detailed test cases
Defined test steps and expected results
Executed test cases manually
Recorded actual results
Verified application behavior against expected results
Identified and documented defects
Performed regression verification where required
2.3 Test Case Coverage

The manual testing covered relevant application functionality including:

Functional validation
Input field validation
Positive scenarios
Negative scenarios
Boundary-value scenarios
Required-field validation
Error-message validation
User interaction and workflow validation
2.4 QA Approach

The test cases were designed to provide meaningful coverage rather than only validating the happy path.

Both valid and invalid inputs were considered to verify how the application behaves under different conditions.

3. Task 2 – ReqRes API Testing Using Postman
3.1 Overview

A Postman collection was created to test the ReqRes REST API and demonstrate API testing using different HTTP methods, authentication, environment variables, and automated test assertions.

The collection covers the user CRUD flow along with authentication and response validation.

API: https://reqres.in/

3.2 Environment Setup

A Postman environment named:

ReqRes QA Environment

was created with reusable variables:

Variable	Purpose
base_url	Base URL of the ReqRes API
api_key	API key used for API access
auth_token	Authentication token returned from the login request
userid	Stores the ID returned when a user is created

Using environment variables makes the collection reusable and avoids hard-coding values in individual requests.

3.3 Authentication

A login request is executed using the ReqRes authentication endpoint.

The login test script validates the successful authentication response and extracts the returned token.

The token is then stored dynamically in:

auth_token

Subsequent authenticated API requests use:

Authorization: Bearer {{auth_token}}

This demonstrates token-based authentication and allows the authentication flow to be reused across the collection.

3.4 API Requests Covered

The collection includes the following requests:

POST – Login
Authenticates the user
Validates the successful response
Extracts the authentication token
Stores the token in the environment
GET – List Users
Retrieves user information
Validates the HTTP response
Validates response structure and user data
POST – Create User
Creates a new user
Validates the successful response
Validates returned user information
Stores the generated user ID
PUT – Update User
Performs a complete update of an existing user
Validates the response status
Validates the updated payload
PATCH – Partial Update User
Updates selected user information
Validates the response
Verifies the modified field
DELETE – Delete User
Deletes the selected user
Validates the expected 204 No Content response
Verifies that the response body is empty where applicable
3.5 API Test Validation

Automated Postman test scripts were added to validate:

Expected HTTP status codes
Response format
JSON response structure
Required response fields
Request and response payload values
Generated user IDs
Authentication token generation
Authentication token storage
Created/updated timestamps where applicable
Empty response body for DELETE requests where applicable
3.6 API Testing Approach

The testing focuses on both functional API validation and response validation.

Instead of validating only HTTP status codes, the test scripts also verify important response data and business-relevant fields.

Environment variables improve maintainability and reduce duplication, while automated assertions provide immediate feedback about API behavior.

The Postman collection and environment can be imported into Postman and executed using the configured environment.

4. Task 3 – UI Automation Testing
4.1 Objective

The objective of Task 3 was to automate an e-commerce user journey using Playwright with TypeScript.

Application:
https://ecommerce-playground.lambdatest.io

4.2 Automation Flow

The automated flow covers:

Login
  ↓
Search Product
  ↓
Add to Cart
  ↓
Proceed to Checkout
  ↓
Payment Page

The automation is designed to validate the complete user journey rather than testing individual UI elements in isolation.

4.3 Technology Stack
Playwright
TypeScript
Node.js
Playwright Test
Page Object Model (POM)
4.4 Page Object Model

The automation framework follows the Page Object Model design pattern.

Page-specific locators and actions are separated from the test logic.

Example structure:

lambda-ecommerce-automation/
│
├── pages/
│   ├── LoginPage.ts
│   └── HomePage.ts
│
├── tests/
│   └── ecommerce-checkout.spec.ts
│
├── test-results/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
Benefits of POM

The Page Object Model provides:

Better code organization
Reusable page actions
Reduced locator duplication
Easier maintenance
Cleaner test cases
Better separation between test logic and UI implementation

For example, login actions are encapsulated inside LoginPage.ts, allowing the test to use a simple method such as:

await loginPage.login(email, password);
5. Automation Test Design
5.1 Login

The automation:

Opens the login page
Enters the registered test account email
Enters the password
Clicks the Login button
Verifies successful login using a URL assertion

Example validation:

await expect(page).toHaveURL(/route=account\/account/);

This verifies that the application navigated to the expected account page after authentication.

5.2 Search Product

After successful login, the automation navigates to the shopping page and uses the product search functionality.

The search field is identified using a stable locator and the product search action is encapsulated inside the Home Page Object.

Example:

await homePage.searchProduct('Apple');
5.3 Add to Cart

The selected product is added to the shopping cart and the automation validates the expected cart behavior.

5.4 Checkout

The automation proceeds through the checkout process and continues until the payment page, as required by the assessment.

5.5 Assertions

Assertions are used to verify expected application behavior rather than simply executing actions.

Examples include:

Successful login URL
Expected product/search result
Cart state
Checkout navigation
Payment page availability
6. Wait Strategy

Playwright's built-in auto-waiting mechanism is used wherever possible.

Actions such as:

await locator.fill();
await locator.click();

automatically wait for elements to become actionable.

Fixed delays such as:

await page.waitForTimeout(5000);

are avoided because they can make tests slower and less reliable.

This approach improves test stability and reduces unnecessary synchronization delays.

7. Screenshot on Failure

Screenshot capture is configured for failed tests.

This provides visual evidence of the application state when an automation test fails and helps with:

Debugging
Root-cause analysis
Failure investigation
Test reporting

Failure artifacts are stored in the Playwright test-results/reporting output.

8. Test Execution

The automation can be executed using Playwright's test runner.

Run the complete test suite
npx playwright test
Run the assessment test in headed mode
npx playwright test tests/ecommerce-checkout.spec.ts --project=chromium --headed
View the HTML report
npx playwright show-report
9. Overall QA Approach

The assessment demonstrates a layered QA approach:

Manual Testing

Used to identify functional scenarios and validate application behavior from an end-user perspective.

API Testing

Used to validate backend/API functionality independently of the UI, including:

HTTP methods
Authentication
Request payloads
Response payloads
Status codes
CRUD operations
Automated assertions
UI Automation

Used to automate critical end-to-end business flows and verify that multiple application components work together correctly.

This combination provides broader test coverage across different layers of the application.

10. Key QA Practices Demonstrated

The assessment demonstrates practical use of:

Manual functional testing
Test scenario design
Test case creation
Positive and negative testing
API testing
REST API methods
Authentication testing
Environment variables
Automated API assertions
CRUD validation
Playwright automation
TypeScript
Page Object Model
Locator strategy
Playwright auto-waiting
URL and UI assertions
Failure screenshots
Test reporting
Git and GitHub
11. Repository Structure

The repository contains the deliverables for all three assessment tasks.

QA-Assessment/
│
├── Task-1-Manual-Testing/
│   ├── Test-Plan
│   ├── Test-Cases
│   ├── Bug-Reports
│   └── Test-Summary
│
├── Task-2-Postman-API-Testing/
│   ├── ReqRes-Collection.json
│   ├── ReqRes-QA-Environment.json
│   └── API-Test-Report
│
├── Task-3-Playwright-Automation/
│   ├── pages/
│   ├── tests/
│   ├── playwright.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── README.md

Adjust the folder/file names above to match the exact names in your GitHub repository.

12. Conclusion

This assessment demonstrates practical QA experience across manual testing, API testing, and UI automation.

The work focuses on validating not only whether requests and UI actions execute successfully, but also whether the application produces the expected results.

The combination of structured manual test cases, automated API assertions, and maintainable Playwright automation provides a foundation for scalable and reliable software testing.

Prepared By: Bhupendra Sen
Software Quality Assurance Engineer
