// Energy Calculator - Main Application Entry Point

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Initializing Energy Calculator...');
        
        // Initialize all charts
        ChartManager.initializeCharts();
        console.log('Charts initialized successfully');
        
        // Initialize personal calculator
        PersonalCalculator.init();
        console.log('Personal calculator initialized');
        
        // Initialize info card updater
        InfoCardUpdater.init();
        console.log('Info card updater initialized');
        
        console.log('Energy Calculator ready!');
    } catch (error) {
        console.error('Error initializing Energy Calculator:', error);
    }
});

// Utility functions can be added here if needed

// Toggle AI section collapse/expand
function toggleAISection() {
    const aiSection = document.querySelector('.ai-section');
    aiSection.classList.toggle('collapsed');
    
    // Save state to localStorage
    const isCollapsed = aiSection.classList.contains('collapsed');
    localStorage.setItem('aiSectionCollapsed', isCollapsed);
}

// Restore AI section state on page load
window.addEventListener('load', function() {
    const isCollapsed = localStorage.getItem('aiSectionCollapsed') === 'true';
    if (isCollapsed) {
        document.querySelector('.ai-section').classList.add('collapsed');
    }
});

// Make toggleAISection available globally
window.toggleAISection = toggleAISection;

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Make scrollToTop available globally
window.scrollToTop = scrollToTop;

// Make InfoCardUpdater available globally for testing
window.InfoCardUpdater = InfoCardUpdater;