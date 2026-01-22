import './FortuneResult.css'

function FortuneResult({ fortune, userName, onReset }) {
  return (
    <div className="fortune-result">
      <div className="result-header">
        <div className="fortune-emoji">{fortune.emoji}</div>
        <h2 className="user-name">{userName}님의 오늘의 운세</h2>
        <div className="fortune-level" style={{ color: fortune.color }}>
          {fortune.level}
        </div>
      </div>

      <div className="fortune-message">
        {fortune.message}
      </div>

      <div className="fortune-details">
        <h3>세부 운세</h3>
        <ul>
          {fortune.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <button onClick={onReset} className="reset-button">
        다시 보기 🔄
      </button>
    </div>
  )
}

export default FortuneResult
