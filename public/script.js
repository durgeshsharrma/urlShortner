 // Automatically dismiss alerts after 3 seconds
 setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.classList.remove('show');
        alert.style.opacity = '0'; // Fades out the alert
    });
}, 3000); // Adjust the time as needed