import React, { useState, useMemo, useCallback } from 'react'
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor'

// Simulate heavy data processing
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
  }))
}

// Memoized component to prevent unnecessary re-renders
const DataItem = React.memo<{ item: { id: number; name: string; value: number; category: string } }>(
  ({ item }) => (
    <div className="card" style={{ marginBottom: '0.5rem' }}>
      <strong>{item.name}</strong> - Value: {item.value} (Category: {item.category})
    </div>
  )
)

export const Dashboard: React.FC = () => {
  const [itemCount, setItemCount] = useState(100)
  const [filter, setFilter] = useState('')
  const performanceData = usePerformanceMonitor()

  // Memoize expensive data generation
  const data = useMemo(() => generateData(itemCount), [itemCount])

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!filter) return data
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase())
    )
  }, [data, filter])

  // Memoize callback to prevent child re-renders
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [])

  const handleCountChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(Number(e.target.value))
  }, [])

  return (
    <div className="container">
      <h1>Performance Dashboard</h1>
      
      <div className="card">
        <h2>Performance Metrics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Memory Usage:</strong> {performanceData.memoryUsage}MB
          </div>
          <div>
            <strong>Render Count:</strong> {performanceData.renderCount}
          </div>
          <div>
            <strong>Load Time:</strong> {performanceData.loadTime}ms
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Data Controls</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label>
            Items:
            <select value={itemCount} onChange={handleCountChange}>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={5000}>5000</option>
            </select>
          </label>
          
          <label>
            Filter:
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search items..."
            />
          </label>
        </div>
        
        <p>Showing {filteredData.length} of {data.length} items</p>
      </div>

      <div className="card">
        <h2>Data List</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredData.map(item => (
            <DataItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard