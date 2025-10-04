// Landing Page JavaScript

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    document.getElementById('signup-tab').classList.add('hidden');
    document.getElementById('login-tab').classList.add('hidden');
    
    // Remove active class from all triggers
    document.querySelectorAll('.tabs-trigger').forEach(trigger => {
        trigger.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    
    // Add active class to clicked trigger
    event.target.classList.add('active');
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically make an API call to register the user
    console.log('Signup attempt:', { email, password });
    
    // For demo purposes, redirect to dashboard
    alert('Account created successfully!');
    window.location.href = 'dashboard.html';
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, redirect to dashboard
    alert('Login successful!');
    window.location.href = 'dashboard.html';
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Simple animation for feature cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.features-grid .card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);