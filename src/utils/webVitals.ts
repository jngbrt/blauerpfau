// Web Vitals monitoring utility
export interface WebVitalMetric {
  name: string
  value: number
  delta: number
  id: string
}

type ReportHandler = (metric: WebVitalMetric) => void

// Polyfill for Web Vitals
const getCLS = (onReport: ReportHandler) => {
  let clsValue = 0
  let clsEntries: PerformanceEntry[] = []

  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0]
        const lastSessionEntry = clsEntries[clsEntries.length - 1]

        if (!firstSessionEntry || 
            entry.startTime - lastSessionEntry.startTime < 1000 ||
            entry.startTime - firstSessionEntry.startTime < 5000) {
          clsEntries.push(entry)
          clsValue += (entry as any).value
        } else {
          clsEntries = [entry]
          clsValue = (entry as any).value
        }
      }
    }

    onReport({
      name: 'CLS',
      value: clsValue,
      delta: (entry as any).value || 0,
      id: 'cls-' + Math.random().toString(36).substr(2, 9)
    })
  })

  observer.observe({ entryTypes: ['layout-shift'] })
}

const getFID = (onReport: ReportHandler) => {
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      onReport({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        delta: entry.processingStart - entry.startTime,
        id: 'fid-' + Math.random().toString(36).substr(2, 9)
      })
    }
  })

  observer.observe({ entryTypes: ['first-input'] })
}

const getLCP = (onReport: ReportHandler) => {
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lastEntry = entries[entries.length - 1]

    onReport({
      name: 'LCP',
      value: lastEntry.startTime,
      delta: lastEntry.startTime,
      id: 'lcp-' + Math.random().toString(36).substr(2, 9)
    })
  })

  observer.observe({ entryTypes: ['largest-contentful-paint'] })
}

const getFCP = (onReport: ReportHandler) => {
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        onReport({
          name: 'FCP',
          value: entry.startTime,
          delta: entry.startTime,
          id: 'fcp-' + Math.random().toString(36).substr(2, 9)
        })
      }
    }
  })

  observer.observe({ entryTypes: ['paint'] })
}

const getTTFB = (onReport: ReportHandler) => {
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming
        onReport({
          name: 'TTFB',
          value: navEntry.responseStart - navEntry.fetchStart,
          delta: navEntry.responseStart - navEntry.fetchStart,
          id: 'ttfb-' + Math.random().toString(36).substr(2, 9)
        })
      }
    }
  })

  observer.observe({ entryTypes: ['navigation'] })
}

export const reportWebVitals = (onReport: ReportHandler) => {
  try {
    getCLS(onReport)
    getFID(onReport)
    getLCP(onReport)
    getFCP(onReport)
    getTTFB(onReport)
  } catch (error) {
    console.warn('Web Vitals monitoring not supported:', error)
  }
}