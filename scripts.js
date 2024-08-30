// Google Sheets API URL
const sheetUrl = 'https://spreadsheets.google.com/feeds/list/1KLw9CdXjern4YRsurtSSvsat2E-2PGtklOw3LTektgE/od6/public/values?alt=json';

document.addEventListener('DOMContentLoaded', () => {
    // Get the ID from the query parameter
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
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            const interns = data.feed.entry;
            const intern = interns.find(i => i.gsx$id.$t === id);

            if (intern) {
                document.getElementById('intern-details').innerHTML = `
                    <p><strong>Name:</strong> ${intern.gsx$name.$t}</p>
                    <p><strong>Department:</strong> ${intern.gsx$department.$t}</p>
                    <p><strong>Internship Period:</strong> ${intern.gsx$period.$t}</p>
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
