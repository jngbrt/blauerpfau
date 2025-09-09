import { useState, useEffect, useRef } from 'react'

interface PerformanceData {
  memoryUsage: number
  renderCount: number
  loadTime: number
}

export const usePerformanceMonitor = (): PerformanceData => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    memoryUsage: 0,
    renderCount: 0,
    loadTime: 0
  })
  
  const renderCountRef = useRef(0)
  const startTimeRef = useRef(performance.now())

  useEffect(() => {
    renderCountRef.current += 1

    // Update performance data
    const updatePerformanceData = () => {
      const memoryInfo = (performance as any).memory
      const memoryUsage = memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0
      const loadTime = Math.round(performance.now() - startTimeRef.current)

      setPerformanceData({
        memoryUsage,
        renderCount: renderCountRef.current,
        loadTime
      })
    }

    updatePerformanceData()

    // Update periodically
    const interval = setInterval(updatePerformanceData, 1000)

    return () => clearInterval(interval)
  }, [])

  return performanceData
}