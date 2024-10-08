// Function to format date as dd/mmm/yyyy
function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', options);
}

// Function to validate certificate ID format
function validateCertificateId(id) {
    // Regular expression for the format "PFSI0000C"
    const pattern = /^PFSI\d{4}[A-Z]$/;
    return pattern.test(id);
}

// Function to get the C.ID from URL parameters
function getCertificateIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('certificateId');
}

// Function to verify the certificate ID
function verifyCertificate(certificateId) {
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    // Check if the certificate ID is empty
    if (!certificateId) {
        resultDiv.innerHTML = '<p class="error">Please enter a C.ID.</p>';
        return; // Exit the function early
    }

    // Validate the certificate ID format
    if (!validateCertificateId(certificateId)) {
        resultDiv.innerHTML = '<p class="error">Invalid C.ID format. Please enter a valid C.ID in the format PFSI0000C.</p>';
        return; // Exit the function early
    }

    // Show loading animation
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = ''; // Clear previous result

    // Fetch data from the Google Apps Script web app
    fetch(`https://script.google.com/macros/s/AKfycbx0KGSluyITJTW0DAO2gKayUlP5pjpv4xoojVhyHXxZOnZnOrmv8TuaunoHGSKUdKEg_A/exec?certificateId=${certificateId}`)
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Hide loading animation
            loadingDiv.style.display = 'none';

            // Check if the response indicates success
            if (data.success) {
                // Extract certificate details from the response
                const details = data.certificateDetails;
                if (!details) {
                    // Display an error message if the ID does not exist
                    resultDiv.innerHTML = '<p class="error">C.ID does not exist. Please check your C.ID again.</p>';
                } else {
                    // Format dates
                    const startDate = formatDate(details.startDate);
                    const endDate = formatDate(details.endDate);
                    const issuedDate = formatDate(details.certificateIssuedDate);
                    // Display the certificate details in the result div with updated styling
                    resultDiv.innerHTML = `
                        <p style="text-align: center; font-weight: bold; color: #112051;">Certificate Details</p>
                        <p style="text-align: left; font-weight: normal;">Intern Name: ${details.internName}</p>
                        <p style="text-align: left; font-weight: normal;">Domain: ${details.domain}</p>
                        <p style="text-align: left; font-weight: normal;">Duration: ${startDate} - ${endDate}</p>
                        <p style="text-align: left; font-weight: normal;">C.ID: ${details.certificateId}</p>
                        <p style="text-align: left; font-weight: normal;">Certificate Issued Date: ${issuedDate}</p>
                    `;
                }
            } else {
                // Display an error message if the verification response indicates failure
                resultDiv.innerHTML = `<p class="error">${data.message}</p>`;
            }
        })
        .catch(error => {
            // Hide loading animation
            loadingDiv.style.display = 'none';
            // Display an error message if there was an issue fetching the data
            resultDiv.innerHTML = `<p class="error">Error fetching certificate data. Please try again later.</p>`;
        })
        .finally(() => {
            // Clear the input field after result is displayed
            document.getElementById('certificateId').value = '';
        });
}

// Run the function to check if there's a C.ID in the URL when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const certificateId = getCertificateIdFromURL();
    if (certificateId) {
        verifyCertificate(certificateId);
    }
});


==================================================================================================================================================
// // Function to format date as dd/mmm/yyyy
// function formatDate(dateStr) {
//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-GB', options);
// }

// // Function to validate certificate ID format
// function validateCertificateId(id) {
//     // Regular expression for the format "PFSI0000C"
//     const pattern = /^PFSI\d{4}[A-Z]$/;
//     return pattern.test(id);
// }

// // Function to verify the certificate ID
// function verifyCertificate() {
//     const certificateId = document.getElementById('certificateId').value.trim();
//     const resultDiv = document.getElementById('result');
//     const loadingDiv = document.getElementById('loading');

//     // Check if the certificate ID is empty
//     if (!certificateId) {
//         resultDiv.innerHTML = '<p class="error">Please enter a C.ID.</p>';
//         return; // Exit the function early
//     }

//     // Validate the certificate ID format
//     if (!validateCertificateId(certificateId)) {
//         resultDiv.innerHTML = '<p class="error">Invalid C.ID format. Please enter a valid C.ID in the format PFSI0000C.</p>';
//         return; // Exit the function early
//     }

//     // Show loading animation
//     loadingDiv.style.display = 'block';
//     resultDiv.innerHTML = ''; // Clear previous result

//     // Fetch data from the Google Apps Script web app
//     fetch(`https://script.google.com/macros/s/AKfycbx0KGSluyITJTW0DAO2gKayUlP5pjpv4xoojVhyHXxZOnZnOrmv8TuaunoHGSKUdKEg_A/exec?certificateId=${certificateId}`)
//         .then(response => response.json())  // Parse the response as JSON
//         .then(data => {
//             // Hide loading animation
//             loadingDiv.style.display = 'none';

//             // Check if the response indicates success
//             if (data.success) {
//                 // Extract certificate details from the response
//                 const details = data.certificateDetails;
//                 if (!details) {
//                     // Display an error message if the ID does not exist
//                     resultDiv.innerHTML = '<p class="error">C.ID does not exist. Please check your C.ID again.</p>';
//                 } else {
//                     // Format dates
//                     const startDate = formatDate(details.startDate);
//                     const endDate = formatDate(details.endDate);
//                     const issuedDate = formatDate(details.certificateIssuedDate);
//                     // Display the certificate details in the result div with updated styling
//                     resultDiv.innerHTML = `
//                         <p style="text-align: center; font-weight: bold; color: #112051;">Certificate Details</p>
//                         <p style="text-align: left; font-weight: normal;">Intern Name: ${details.internName}</p>
//                         <p style="text-align: left; font-weight: normal;">Domain: ${details.domain}</p>
//                         <p style="text-align: left; font-weight: normal;">Duration: ${startDate} - ${endDate}</p>
//                         <p style="text-align: left; font-weight: normal;">C.ID: ${details.certificateId}</p>
//                         <p style="text-align: left; font-weight: normal;">Certificate Issued Date: ${issuedDate}</p>
//                     `;
//                 }
//             } else {
//                 // Display an error message if the verification response indicates failure
//                 // resultDiv.innerHTML = `<p class="error">${data.message}</p>`;
//                 resultDiv.innerHTML = '<p class="error">C.ID does not exist. Please check your C.ID again.</p>';
//             }
//         })
//         .catch(error => {
//             // Hide loading animation
//             loadingDiv.style.display = 'none';
//             // Display an error message if there was an issue fetching the data
//             resultDiv.innerHTML = `<p class="error">Error fetching certificate data. Please try again later.</p>`;
//         })
//         .finally(() => {
//             // Clear the input field after result is displayed
//             document.getElementById('certificateId').value = '';
//         });
// }
