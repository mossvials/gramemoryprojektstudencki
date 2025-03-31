// Constants for time calculations
const ONE_HOUR = 60 * 60 * 1000; // One hour in milliseconds
const TEST_DURATION = 10 * 60 * 1000; // Change to 15 minutes for testing (replace with 168 * ONE_HOUR for production)

// Retrieve the stored timestamp or initialize it
let firstGameTime = localStorage.getItem('firstGameTime');
if (!firstGameTime) {
    // If no timestamp exists, initialize it with the current time
    firstGameTime = new Date().getTime();
    localStorage.setItem('firstGameTime', firstGameTime);
    console.log('First game time initialized:', new Date(firstGameTime).toLocaleString());
} else {
    // Parse the stored timestamp
    firstGameTime = parseInt(firstGameTime, 10);
    console.log('First game time retrieved from localStorage:', new Date(firstGameTime).toLocaleString());
}

// Get the current time and calculate the time elapsed
const currentTime = new Date().getTime();
const timeElapsed = currentTime - firstGameTime;
console.log('Current time:', new Date(currentTime).toLocaleString());
console.log('Time elapsed since first game (ms):', timeElapsed);

// Get button elements
const buttonB1 = document.getElementById('buttonB1');
const buttonB2 = document.getElementById('buttonB2');
const buttonB3 = document.getElementById('buttonB3');

// Ensure buttons exist before applying logic
if (buttonB1 && buttonB2 && buttonB3) {
    console.log('Buttons found:', buttonB1, buttonB2, buttonB3);

    // Logic to enable/disable buttons based on time elapsed
    if (timeElapsed < TEST_DURATION) {
        // First button is enabled for the first 15 minutes
        buttonB1.disabled = false;
        buttonB2.disabled = true;
        buttonB3.disabled = true;
        console.log('Button B1 is enabled.');
    } else if (timeElapsed >= TEST_DURATION && timeElapsed < 2 * TEST_DURATION) {
        // Second button is enabled for the next 15 minutes
        buttonB1.disabled = true;
        buttonB2.disabled = false;
        buttonB3.disabled = true;
        console.log('Button B2 is enabled.');
    } else if (timeElapsed >= 2 * TEST_DURATION && timeElapsed < 3 * TEST_DURATION) {
        // Third button is enabled after the second 15 minutes
        buttonB1.disabled = true;
        buttonB2.disabled = true;
        buttonB3.disabled = false;
        console.log('Button B3 is enabled.');
    } else {
        // After all periods, all buttons are disabled
        buttonB1.disabled = true;
        buttonB2.disabled = true;
        buttonB3.disabled = true;
        console.log('All buttons are disabled.');
    }
} else {
    console.error('One or more button elements are missing in the DOM.');
}