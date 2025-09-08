import React from 'react'

const About: React.FC = () => {
  return (
    <div className="container">
      <h1>About Performance Optimization</h1>
      
      <div className="card">
        <h2>Bundle Size Optimization</h2>
        <ul>
          <li><strong>Tree Shaking:</strong> Eliminates unused code from the final bundle</li>
          <li><strong>Code Splitting:</strong> Splits code into smaller chunks loaded on demand</li>
          <li><strong>Dynamic Imports:</strong> Load modules only when needed</li>
          <li><strong>Chunk Splitting:</strong> Separates vendor libraries from application code</li>
        </ul>
      </div>

      <div className="card">
        <h2>Load Time Optimization</h2>
        <ul>
          <li><strong>Critical CSS:</strong> Inline critical styles in HTML head</li>
          <li><strong>Resource Preloading:</strong> Preconnect to external domains</li>
          <li><strong>Image Optimization:</strong> Lazy loading and modern formats</li>
          <li><strong>Service Worker:</strong> Cache resources for offline access</li>
        </ul>
      </div>

      <div className="card">
        <h2>Runtime Performance</h2>
        <ul>
          <li><strong>React.memo:</strong> Prevents unnecessary re-renders</li>
          <li><strong>useMemo & useCallback:</strong> Memoize expensive calculations</li>
          <li><strong>Error Boundaries:</strong> Graceful error handling</li>
          <li><strong>Web Vitals:</strong> Monitor Core Web Vitals metrics</li>
        </ul>
      </div>
    </div>
  )
}

export default About