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
        
        // Add any additional initialization here
        
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