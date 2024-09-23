 // Fetch and display the counter value on page load
 const fetchCounter = async () => {
    try {
        const response = await fetch('http://localhost:4203/counter');
        const data = await response.json();
        document.getElementById('counter').innerText = data.count;
    } catch (error) {
        console.error('Error fetching counter:', error);
    }
};

// Increment the counter on button click
document.getElementById('incrementButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:4203/counter/increment', {
            method: 'POST',
        });
        const data = await response.json();
        document.getElementById('counter').innerText = data.count;
    } catch (error) {
        console.error('Error:', error);
    }
});
// Reset the counter on button click
document.getElementById('resetButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:4203/counter/reset', {
            method: 'POST',
        });
        const data = await response.json();
        document.getElementById('counter').innerText = data.count;
    } catch (error) {
        console.error('Error:', error);
    }
});


// Call fetchCounter on page load
fetchCounter();