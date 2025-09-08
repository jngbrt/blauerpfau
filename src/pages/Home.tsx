import React from 'react'
import LazyImage from '../components/LazyImage'

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Performance Optimized App</h1>
      
      <div className="card">
        <h2>Welcome to our high-performance application!</h2>
        <p>
          This application demonstrates various performance optimization techniques:
        </p>
        
        <ul>
          <li>Code splitting with React.lazy()</li>
          <li>Lazy loading of images</li>
          <li>Bundle optimization with Vite</li>
          <li>Service Worker for caching</li>
          <li>Web Vitals monitoring</li>
          <li>Error boundaries for resilience</li>
          <li>Tree shaking for smaller bundles</li>
        </ul>
      </div>

      <div className="card">
        <h3>Optimized Image Loading</h3>
        <p>Images below are loaded lazily when they come into view:</p>
        
        <LazyImage
          src="https://picsum.photos/800/400?random=1"
          alt="Sample image 1"
          width={800}
          height={400}
          className="lazy-image"
        />
        
        <LazyImage
          src="https://picsum.photos/800/400?random=2"
          alt="Sample image 2"
          width={800}
          height={400}
          className="lazy-image"
        />
      </div>
    </div>
  )
}

export default Home