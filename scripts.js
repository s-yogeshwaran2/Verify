function searchIntern() {
    const internId = document.getElementById('internId').value.trim();
    if (internId) {
        // Placeholder: Show a message with the entered ID
        document.getElementById('intern-details').innerHTML = `
            <p><strong>Searching for ID:</strong> ${internId}</p>
            <p>Details will be displayed here.</p>
        `;
    } else {
        document.getElementById('intern-details').innerHTML = 'Please enter an ID to search.';
    }
}
