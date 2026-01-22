import { useState } from 'react'
import './FortuneForm.css'

function FortuneForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }

    if (!birthDate) {
      setError('생년월일을 입력해주세요.')
      return
    }

    const today = new Date()
    const birth = new Date(birthDate)
    
    if (birth > today) {
      setError('미래 날짜는 입력할 수 없습니다.')
      return
    }

    onSubmit(name.trim(), birthDate)
  }

  return (
    <form className="fortune-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">생년월일</label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="form-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button">
        조회하기 ✨
      </button>
    </form>
  )
}

export default FortuneForm
