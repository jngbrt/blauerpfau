import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Performance monitoring
const startTime = performance.now()

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  import('./registerSW').then(({ registerSW }) => {
    registerSW()
  })
}

// Render app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Log performance metrics
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime
  console.log(`App loaded in ${loadTime.toFixed(2)}ms`)
  
  // Report Core Web Vitals
  import('./utils/webVitals').then(({ reportWebVitals }) => {
    reportWebVitals((metric) => {
      console.log(metric)
      // In production, send to analytics
      // analytics.track(metric.name, metric.value)
    })
  })
})