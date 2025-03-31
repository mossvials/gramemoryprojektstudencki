
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from submitting (refreshing the page)

    const username = document.getElementById('username').value;
    // Predefined login credentials (can be hardcoded or fetched from a secure source)
    const validCredentials = [
        { username: 'test1', redirectTo: 'instrukcja1.html' },
        { username: 'test2', redirectTo: 'instrukcja2.html' },
        { username: 'A1B2X', redirectTo: 'instrukcja1.html' },
        { username: 'A2C3Y', redirectTo: 'instrukcja1.html' },
        { username: 'A3D4Z', redirectTo: 'instrukcja1.html' },
        { username: 'A4E5W', redirectTo: 'instrukcja1.html' },
        { username: 'A5F6V', redirectTo: 'instrukcja1.html' },
        { username: 'A6G7U', redirectTo: 'instrukcja1.html' },
        { username: 'A7H8T', redirectTo: 'instrukcja1.html' },
        { username: 'A8J9S', redirectTo: 'instrukcja1.html' },
        { username: 'A9K0R', redirectTo: 'instrukcja1.html' },
        { username: 'A1L2P', redirectTo: 'instrukcja1.html' },
        { username: 'A2M3O', redirectTo: 'instrukcja1.html' },
        { username: 'A3N4N', redirectTo: 'instrukcja1.html' },
        { username: 'A4O5M', redirectTo: 'instrukcja1.html' },
        { username: 'A5P6L', redirectTo: 'instrukcja1.html' },
        { username: 'A6Q7K', redirectTo: 'instrukcja1.html' },
        { username: 'A7R8J', redirectTo: 'instrukcja1.html' },
        { username: 'A8S9I', redirectTo: 'instrukcja1.html' },
        { username: 'A9T0H', redirectTo: 'instrukcja1.html' },
        { username: 'A1U2G', redirectTo: 'instrukcja1.html' },
        { username: 'A2V3F', redirectTo: 'instrukcja1.html' },
        { username: 'A3W4E', redirectTo: 'instrukcja1.html' },
        { username: 'A4X5D', redirectTo: 'instrukcja1.html' },
        { username: 'A5Y6C', redirectTo: 'instrukcja1.html' },
        { username: 'A6Z7B', redirectTo: 'instrukcja1.html' },
        { username: 'A7A8A', redirectTo: 'instrukcja1.html' },
        { username: 'A8B9Z', redirectTo: 'instrukcja1.html' },
        { username: 'A9C0Y', redirectTo: 'instrukcja1.html' },
        { username: 'A1D2X', redirectTo: 'instrukcja1.html' },
        { username: 'A2E3W', redirectTo: 'instrukcja1.html' },
        { username: 'A3F4V', redirectTo: 'instrukcja1.html' },
        { username: 'A4G5U', redirectTo: 'instrukcja1.html' },
        { username: 'A5H6T', redirectTo: 'instrukcja1.html' },
        { username: 'A6I7S', redirectTo: 'instrukcja1.html' },
        { username: 'A7J8R', redirectTo: 'instrukcja1.html' },
        { username: 'A8K9Q', redirectTo: 'instrukcja1.html' },
        { username: 'A9L0P', redirectTo: 'instrukcja1.html' },
        { username: 'A1M2O', redirectTo: 'instrukcja1.html' },
        { username: 'A2N3N', redirectTo: 'instrukcja1.html' },
        { username: 'A3O4M', redirectTo: 'instrukcja1.html' },
        { username: 'A4P5L', redirectTo: 'instrukcja1.html' },
        { username: 'A5Q6K', redirectTo: 'instrukcja1.html' },
        { username: 'A6R7J', redirectTo: 'instrukcja1.html' },
        { username: 'A7S8I', redirectTo: 'instrukcja1.html' },
        { username: 'A8T9H', redirectTo: 'instrukcja1.html' },
        { username: 'A9U0G', redirectTo: 'instrukcja1.html' },
        { username: 'A1V2F', redirectTo: 'instrukcja1.html' },
        { username: 'A2W3E', redirectTo: 'instrukcja1.html' },
        { username: 'A3X4D', redirectTo: 'instrukcja1.html' },
        { username: 'A4Y5C', redirectTo: 'instrukcja1.html' },
        { username: 'A5Z6B', redirectTo: 'instrukcja1.html' },
        { username: 'A6A7A', redirectTo: 'instrukcja1.html' },
        { username: 'A7B8Z', redirectTo: 'instrukcja1.html' },
        { username: 'B1C2X', redirectTo: 'instrukcja2.html' },
        { username: 'B2D3Y', redirectTo: 'instrukcja2.html' },
        { username: 'B3E4Z', redirectTo: 'instrukcja2.html' },
        { username: 'B4F5W', redirectTo: 'instrukcja2.html' },
        { username: 'B5G6V', redirectTo: 'instrukcja2.html' },
        { username: 'B6H7U', redirectTo: 'instrukcja2.html' },
        { username: 'B7I8T', redirectTo: 'instrukcja2.html' },
        { username: 'B8J9S', redirectTo: 'instrukcja2.html' },
        { username: 'B9K0R', redirectTo: 'instrukcja2.html' },
        { username: 'B1L2P', redirectTo: 'instrukcja2.html' },
        { username: 'B2M3O', redirectTo: 'instrukcja2.html' },
        { username: 'B3N4N', redirectTo: 'instrukcja2.html' },
        { username: 'B4O5M', redirectTo: 'instrukcja2.html' },
        { username: 'B5P6L', redirectTo: 'instrukcja2.html' },
        { username: 'B6Q7K', redirectTo: 'instrukcja2.html' },
        { username: 'B7R8J', redirectTo: 'instrukcja2.html' },
        { username: 'B8S9I', redirectTo: 'instrukcja2.html' },
        { username: 'B9T0H', redirectTo: 'instrukcja2.html' },
        { username: 'B1U2G', redirectTo: 'instrukcja2.html' },
        { username: 'B2V3F', redirectTo: 'instrukcja2.html' },
        { username: 'B3W4E', redirectTo: 'instrukcja2.html' },
        { username: 'B4X5D', redirectTo: 'instrukcja2.html' },
        { username: 'B5Y6C', redirectTo: 'instrukcja2.html' },
        { username: 'B6Z7B', redirectTo: 'instrukcja2.html' },
        { username: 'B7A8A', redirectTo: 'instrukcja2.html' },
        { username: 'B8B9Z', redirectTo: 'instrukcja2.html' },
        { username: 'B9C0Y', redirectTo: 'instrukcja2.html' },
        { username: 'B1D2X', redirectTo: 'instrukcja2.html' },
        { username: 'B2E3W', redirectTo: 'instrukcja2.html' },
        { username: 'B3F4V', redirectTo: 'instrukcja2.html' },
        { username: 'B4G5U', redirectTo: 'instrukcja2.html' },
        { username: 'B5H6T', redirectTo: 'instrukcja2.html' },
        { username: 'B6I7S', redirectTo: 'instrukcja2.html' },
        { username: 'B7J8R', redirectTo: 'instrukcja2.html' },
        { username: 'B8K9Q', redirectTo: 'instrukcja2.html' },
        { username: 'B9L0P', redirectTo: 'instrukcja2.html' },
        { username: 'B1M2O', redirectTo: 'instrukcja2.html' },
        { username: 'B2N3N', redirectTo: 'instrukcja2.html' },
        { username: 'B3O4M', redirectTo: 'instrukcja2.html' },
        { username: 'B4P5L', redirectTo: 'instrukcja2.html' },
        { username: 'B5Q6K', redirectTo: 'instrukcja2.html' },
        { username: 'B6R7J', redirectTo: 'instrukcja2.html' },
        { username: 'B7S8I', redirectTo: 'instrukcja2.html' },
        { username: 'B8T9H', redirectTo: 'instrukcja2.html' },
        { username: 'B9U0G', redirectTo: 'instrukcja2.html' },
        { username: 'B1V2F', redirectTo: 'instrukcja2.html' },
        { username: 'B2W3E', redirectTo: 'instrukcja2.html' },
        { username: 'B3X4D', redirectTo: 'instrukcja2.html' },
        { username: 'B4Y5C', redirectTo: 'instrukcja2.html' },
        { username: 'B5Z6B', redirectTo: 'instrukcja2.html' },
        { username: 'B6A7A', redirectTo: 'instrukcja2.html' },
        { username: 'B7B8Z', redirectTo: 'instrukcja2.html' },
    ];

    const user = validCredentials.find(cred => cred.username === username);

    if (user) {
        sessionStorage.setItem('username', username); // Store the username in session storage
        window.location.href = user.redirectTo;
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
});