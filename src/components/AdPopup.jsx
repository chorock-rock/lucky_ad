import { useEffect, useRef } from 'react'
import './AdPopup.css'

function AdPopup({ onClose }) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="ad-popup-overlay" onClick={onClose}>
      <div className="ad-popup" onClick={(e) => e.stopPropagation()}>
        <div className="ad-content">
          <div className="ad-image">
            <div className="ad-placeholder">
              <span className="ad-icon">📢</span>
              <p>광고 영역</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdPopup
