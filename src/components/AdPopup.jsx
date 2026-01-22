import { useEffect, useState } from 'react'
import './AdPopup.css'

function AdPopup({ onClose }) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onClose])

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
