const csvUrl = 'https://docs.google.com/spreadsheets/d/1KLw9CdXjern4YRsurtSSvsat2E-2PGtklOw3LTektgE/export?format=csv';

document.addEventListener('DOMContentLoaded', () => {
    // Get the ID from the query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const internId = urlParams.get('id');

    if (internId) {
        displayInternDetails(internId);
    }
});

function searchIntern() {
    const internId = document.getElementById('internId').value.trim();
    if (internId) {
        displayInternDetails(internId);
    }
}

function displayInternDetails(id) {
    fetch(csvUrl)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').map(row => row.split(','));
            const headers = rows[0];
            const dataRows = rows.slice(1);

            const intern = dataRows.find(row => row[0] === id);

            if (intern) {
                document.getElementById('intern-details').innerHTML = `
                    <p><strong>Name:</strong> ${intern[1]}</p>
                    <p><strong>Department:</strong> ${intern[2]}</p>
                    <p><strong>Internship Period:</strong> ${intern[3]}</p>
                `;
            } else {
                document.getElementById('intern-details').innerHTML = 'Intern not found';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('intern-details').innerHTML = 'Error loading intern details';
        });
}
