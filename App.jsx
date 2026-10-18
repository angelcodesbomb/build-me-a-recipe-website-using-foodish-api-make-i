import { useState, useEffect } from 'react'
import { fetchFoodImage } from './lib/api.js'

export default function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  // Load a batch of images
  const loadImages = async (count = 6) => {
    setLoading(true)
    const newImages = []
    for (let i = 0; i < count; i++) {
      const img = await fetchFoodImage()
      if (img) newImages.push(img)
    }
    setImages(prev => [...prev, ...newImages])
    setLoading(false)
  }

  useEffect(() => {
    // initial load
    loadImages()
  }, [])

  const handleLoadMore = () => {
    if (!loading) loadImages()
  }

  const containerStyle = {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    backgroundColor: '#fff8f0',
    minHeight: '100vh',
    padding: '1rem',
    color: '#333',
    textAlign: 'center'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  }

  const cardStyle = {
    backgroundColor: '#fffbf5',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  }

  const imgStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  }

  const buttonStyle = {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#ffb347',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  }

  return (
    <div style={containerStyle}>
      <h1>🍽️ Cute Foodish Recipes 🍽️</h1>
      <p>Random tasty dishes served with a side of cartoon fun!</p>
      <section style={gridStyle} aria-label="Food gallery">
        {images.map((src, idx) => (
          <article
            key={src + idx}
            style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={src}
              alt="Delicious random dish"
              style={imgStyle}
              loading="lazy"
            />
          </article>
        ))}
      </section>
      <button
        onClick={handleLoadMore}
        disabled={loading}
        style={buttonStyle}
        aria-label="Load more food images"
      >
        {loading ? 'Loading...' : 'Load More 🍜'}
      </button>
    </div>
  )
}
