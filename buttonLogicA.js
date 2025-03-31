// Constants for time calculations
const ONE_HOUR = 60 * 60 * 1000; // One hour in milliseconds
const TEST_DURATION = 10 * 60 * 1000; // Change to 15 minutes for testing (replace with 168 * ONE_HOUR for production)

// Retrieve the stored timestamp or initialize it
let firstGameTimeA = localStorage.getItem('firstGameTimeA');
if (!firstGameTimeA) {
    // If no timestamp exists, initialize it with the current time
    firstGameTimeA = new Date().getTime();
    localStorage.setItem('firstGameTimeA', firstGameTimeA);
    console.log('First game time initialized for A:', new Date(firstGameTimeA).toLocaleString());
} else {
    // Parse the stored timestamp
    firstGameTimeA = parseInt(firstGameTimeA, 10);
    console.log('First game time retrieved for A from localStorage:', new Date(firstGameTimeA).toLocaleString());
}

// Get the current time and calculate the time elapsed
const currentTimeA = new Date().getTime();
const timeElapsedA = currentTimeA - firstGameTimeA;
console.log('Current time for A:', new Date(currentTimeA).toLocaleString());
console.log('Time elapsed since first game for A (ms):', timeElapsedA);

// Get button elements
const buttonA1 = document.getElementById('buttonA1');
const buttonA2 = document.getElementById('buttonA2');
const buttonA3 = document.getElementById('buttonA3');

// Ensure buttons exist before applying logic
if (buttonA1 && buttonA2 && buttonA3) {
    console.log('Buttons found for A:', buttonA1, buttonA2, buttonA3);

    // Logic to enable/disable buttons based on time elapsed
    if (timeElapsedA < TEST_DURATION) {
        // First button is enabled for the first 15 minutes
        buttonA1.disabled = false;
        buttonA2.disabled = true;
        buttonA3.disabled = true;
        console.log('Button A1 is enabled.');
    } else if (timeElapsedA >= TEST_DURATION && timeElapsedA < 2 * TEST_DURATION) {
        // Second button is enabled for the next 15 minutes
        buttonA1.disabled = true;
        buttonA2.disabled = false;
        buttonA3.disabled = true;
        console.log('Button A2 is enabled.');
    } else if (timeElapsedA >= 2 * TEST_DURATION && timeElapsedA < 3 * TEST_DURATION) {
        // Third button is enabled after the second 15 minutes
        buttonA1.disabled = true;
        buttonA2.disabled = true;
        buttonA3.disabled = false;
        console.log('Button A3 is enabled.');
    } else {
        // After all periods, all buttons are disabled
        buttonA1.disabled = true;
        buttonA2.disabled = true;
        buttonA3.disabled = true;
        console.log('All buttons for A are disabled.');
    }
} else {
    console.error('One or more button elements for A are missing in the DOM.');
}