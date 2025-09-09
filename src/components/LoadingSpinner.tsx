import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  return (
    <div className="loading-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div 
        className={`loading-spinner ${sizeClasses[size]}`}
        style={{
          width: size === 'small' ? '24px' : size === 'large' ? '64px' : '40px',
          height: size === 'small' ? '24px' : size === 'large' ? '64px' : '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
        aria-label="Loading"
      />
      {message && (
        <p style={{ marginTop: '1rem', color: '#666' }}>
          {message}
        </p>
      )}
    </div>
  )
}

export default React.memo(LoadingSpinner)