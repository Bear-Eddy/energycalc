# Energy Calculator - Multi-file Structure

## Overview
This Energy Calculator has been refactored from a single HTML file into a modular, multi-file structure for better performance and maintainability.

## File Structure
```
EnergyCalc/
├── index.html       # Main HTML file (cleaned up)
├── styles.css       # All CSS styles extracted
├── config.js        # Configuration and constants
├── charts.js        # Chart management module
├── calculator.js    # Personal calculator logic
└── main.js          # Main application entry point
```

## Performance Optimizations Implemented
1. **Separated CSS** - All styles moved to external stylesheet
2. **Modular JavaScript** - Code split into logical modules
3. **Configuration Extracted** - All constants and data in config.js

## Recommended Performance Improvements

### 1. Lazy Loading for Chart.js
Instead of loading Chart.js immediately, consider loading it when needed:
```html
<!-- Replace the Chart.js script tag with: -->
<script>
  function loadChartJS() {
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => ChartManager.initializeCharts();
      document.head.appendChild(script);
    }
  }
  // Load after page content
  window.addEventListener('load', loadChartJS);
</script>
```

### 2. Minification
For production, minify all CSS and JS files:
- Use a build tool like Webpack, Rollup, or Parcel
- Or use online minifiers for quick optimization
- Minified files should be named: `*.min.css` and `*.min.js`

### 3. Bundle JavaScript Files
Consider bundling the JS files for production:
```html
<!-- For development: keep separate files -->
<!-- For production: create bundle.min.js -->
<script src="bundle.min.js"></script>
```

### 4. Enable Compression
Configure your web server to use gzip/brotli compression for all text files.

### 5. Cache Headers
Set appropriate cache headers for static assets:
- CSS/JS files: Cache for 1 year with versioning
- HTML: No cache or short cache

### 6. Image Optimization
While this app doesn't use images, if you add any:
- Use WebP format with fallbacks
- Implement lazy loading for images
- Use appropriate sizes

### 7. Progressive Enhancement
The calculator could work without JavaScript for basic display:
- Show static data by default
- Enhance with interactivity when JS loads

### 8. Preload Critical Resources
Add preload hints for critical resources:
```html
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="config.js" as="script">
```

## Browser Support
The refactored code uses modern JavaScript features. For older browser support, consider:
- Using Babel for transpilation
- Adding polyfills for unsupported features
- Or specify minimum browser requirements

## Development vs Production
For development:
- Keep files separate for easier debugging
- Use source maps if bundling

For production:
- Minify all files
- Bundle JavaScript
- Enable compression
- Set cache headers
- Consider using a CDN

## Testing
After implementing optimizations, test with:
- Lighthouse (Chrome DevTools)
- WebPageTest
- GTmetrix

## Future Enhancements
1. Convert to a Progressive Web App (PWA)
2. Add offline functionality
3. Implement virtual scrolling for large data sets
4. Consider server-side rendering for initial load
5. Use Web Workers for calculations