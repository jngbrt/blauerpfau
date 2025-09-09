import React, { useState, useEffect } from 'react'
import LazyImage from './LazyImage'

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  category: string
}

interface ProjectsGridProps {
  className?: string
  maxItems?: number
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ 
  className = '', 
  maxItems = 6 
}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Sample project data - replace with your actual Pinterest board data
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'Modern Web Design',
      description: 'Clean and minimalist web design inspiration for modern applications.',
      image: 'https://picsum.photos/400/600?random=1',
      link: 'https://pinterest.com/pin/your-pin-1',
      category: 'Web Design'
    },
    {
      id: '2',
      title: 'UI/UX Portfolio',
      description: 'Creative user interface designs and user experience patterns.',
      image: 'https://picsum.photos/400/500?random=2',
      link: 'https://pinterest.com/pin/your-pin-2',
      category: 'UI/UX'
    },
    {
      id: '3',
      title: 'React Components',
      description: 'Reusable React component designs and implementation patterns.',
      image: 'https://picsum.photos/400/700?random=3',
      link: 'https://pinterest.com/pin/your-pin-3',
      category: 'Development'
    },
    {
      id: '4',
      title: 'Color Palettes',
      description: 'Beautiful color combinations and design system inspirations.',
      image: 'https://picsum.photos/400/450?random=4',
      link: 'https://pinterest.com/pin/your-pin-4',
      category: 'Design'
    },
    {
      id: '5',
      title: 'Typography',
      description: 'Modern typography trends and font pairing examples.',
      image: 'https://picsum.photos/400/550?random=5',
      link: 'https://pinterest.com/pin/your-pin-5',
      category: 'Typography'
    },
    {
      id: '6',
      title: 'Mobile Design',
      description: 'Responsive mobile design patterns and best practices.',
      image: 'https://picsum.photos/400/650?random=6',
      link: 'https://pinterest.com/pin/your-pin-6',
      category: 'Mobile'
    }
  ]

  useEffect(() => {
    // Simulate API call - replace with actual Pinterest API or data source
    const loadProjects = async () => {
      setLoading(true)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProjects(sampleProjects.slice(0, maxItems))
      setLoading(false)
    }

    loadProjects()
  }, [maxItems])

  const handleProjectClick = (project: Project) => {
    // Open Pinterest link in new tab
    window.open(project.link, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className={`projects-grid-loading ${className}`}>
        <div className="loading-spinner">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className={`projects-grid ${className}`}>
      <div className="projects-grid-header">
        <h2>Featured Projects</h2>
        <p>Discover our latest design inspirations and development projects</p>
      </div>
      
      <div className="projects-grid-container">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleProjectClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProjectClick(project)
              }
            }}
          >
            <div className="project-image-container">
              <LazyImage
                src={project.image}
                alt={project.title}
                width={400}
                height={500}
                className="project-image"
              />
              <div className="project-overlay">
                <div className="project-category">{project.category}</div>
                <div className="project-action">View on Pinterest</div>
              </div>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="projects-grid-footer">
        <a 
          href="https://pinterest.com/your-username" 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-more-btn"
        >
          View More on Pinterest →
        </a>
      </div>
    </div>
  )
}

export default ProjectsGrid