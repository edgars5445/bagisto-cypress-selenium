const { execSync } = require('child_process');

// Function to run the test suite
async function runTestSuite() {
    for (let i = 0; i < 10; i++) {
        console.log(`Iteration ${i + 1}:`);
        execSync('mocha ./admin/products_and_categories_tests.js', { stdio: 'inherit' });
    }
}
// Run the test suite
runTestSuite();
