// JavaScript to handle smooth scrolling and form submission
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Handle form submission (placeholder)
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
    });
});