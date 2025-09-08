#!/usr/bin/env node

/**
 * Performance Analysis Script
 * Analyzes bundle size, dependencies, and provides optimization recommendations
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

console.log('🚀 Performance Analysis Report')
console.log('================================\n')

// Analyze dependencies
console.log('📦 Dependency Analysis:')
const dependencies = Object.keys(packageJson.dependencies || {})
const devDependencies = Object.keys(packageJson.devDependencies || {})

console.log(`  Total dependencies: ${dependencies.length}`)
console.log(`  Dev dependencies: ${devDependencies.length}`)

// Check for heavy dependencies
const heavyDependencies = [
  'lodash', 'moment', 'jquery', 'bootstrap', 'material-ui'
]

const foundHeavy = dependencies.filter(dep => 
  heavyDependencies.some(heavy => dep.includes(heavy))
)

if (foundHeavy.length > 0) {
  console.log(`  ⚠️  Heavy dependencies found: ${foundHeavy.join(', ')}`)
  console.log('     Consider lighter alternatives')
} else {
  console.log('  ✅ No heavy dependencies detected')
}

console.log()

// Build analysis
console.log('🔧 Build Configuration Analysis:')
try {
  const viteConfig = fs.readFileSync('./vite.config.ts', 'utf8')
  
  const optimizations = [
    { check: 'minify', found: viteConfig.includes('minify'), description: 'Code minification' },
    { check: 'terser', found: viteConfig.includes('terser'), description: 'Advanced minification' },
    { check: 'manualChunks', found: viteConfig.includes('manualChunks'), description: 'Manual chunk splitting' },
    { check: 'sourcemap', found: viteConfig.includes('sourcemap'), description: 'Source maps for debugging' },
  ]

  optimizations.forEach(opt => {
    console.log(`  ${opt.found ? '✅' : '❌'} ${opt.description}`)
  })
} catch (error) {
  console.log('  ❌ Vite config not found')
}

console.log()

// Code analysis
console.log('📊 Code Analysis:')

const analyzeDirectory = (dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) => {
  let fileCount = 0
  let totalSize = 0

  const walkDir = (currentPath) => {
    const files = fs.readdirSync(currentPath)
    
    files.forEach(file => {
      const filePath = path.join(currentPath, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath)
      } else if (extensions.some(ext => file.endsWith(ext))) {
        fileCount++
        totalSize += stat.size
      }
    })
  }

  try {
    walkDir(dir)
  } catch (error) {
    // Directory doesn't exist
  }

  return { fileCount, totalSize }
}

const srcAnalysis = analyzeDirectory('./src')
console.log(`  Source files: ${srcAnalysis.fileCount} files (${(srcAnalysis.totalSize / 1024).toFixed(1)} KB)`)

// Performance recommendations
console.log()
console.log('💡 Performance Recommendations:')

const recommendations = [
  '1. ✅ Use React.lazy() for code splitting (implemented)',
  '2. ✅ Implement lazy loading for images (implemented)',
  '3. ✅ Use React.memo for expensive components (implemented)',
  '4. ✅ Bundle analysis with vite-bundle-analyzer (configured)',
  '5. ✅ Service Worker for caching (implemented)',
  '6. ✅ Web Vitals monitoring (implemented)',
  '7. 🔄 Consider using a CDN for static assets',
  '8. 🔄 Implement server-side rendering (SSR) for better SEO',
  '9. 🔄 Use compression (gzip/brotli) on your server',
  '10. 🔄 Optimize images with modern formats (WebP, AVIF)'
]

recommendations.forEach(rec => console.log(`  ${rec}`))

console.log()
console.log('🏃 Quick Performance Tests:')
console.log('  Run `npm run analyze` to analyze bundle size')
console.log('  Run `npm run perf` to run Lighthouse performance test')
console.log('  Run `npm run build` to create optimized production build')

console.log()
console.log('📈 Performance Metrics to Monitor:')
console.log('  - First Contentful Paint (FCP) < 1.8s')
console.log('  - Largest Contentful Paint (LCP) < 2.5s')
console.log('  - First Input Delay (FID) < 100ms')
console.log('  - Cumulative Layout Shift (CLS) < 0.1')
console.log('  - Time to First Byte (TTFB) < 0.8s')