import { useState, useCallback, useRef } from 'react'
import FortuneForm from './components/FortuneForm'
import FortuneResult from './components/FortuneResult'
import AdPopup from './components/AdPopup'
import './App.css'

function App() {
  const [fortune, setFortune] = useState(null)
  const [userName, setUserName] = useState('')
  const [showAd, setShowAd] = useState(false)
  const pendingDataRef = useRef(null)

  const generateFortune = useCallback((birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    
    // 생년월일을 기반으로 결정적인 운세 생성
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const birthDay = birth.getDate()
    const birthMonth = birth.getMonth() + 1
    
    // 결정적인 해시 값 생성
    const seed = (dayOfYear * 10000 + birthMonth * 100 + birthDay) % 100
    
    const fortunes = [
      {
        level: '대길',
        color: '#ff6b6b',
        emoji: '🌟',
        message: '오늘은 정말 특별한 날입니다! 모든 일이 순조롭게 풀릴 것입니다.',
        details: ['새로운 기회가 찾아옵니다', '인간관계가 원만해집니다', '건강이 좋아집니다']
      },
      {
        level: '길',
        color: '#4ecdc4',
        emoji: '✨',
        message: '오늘은 좋은 하루가 될 것입니다. 긍정적인 에너지가 넘칩니다.',
        details: ['작은 행운이 따릅니다', '목표 달성에 도움이 됩니다', '주변 사람들과 좋은 소식이 있습니다']
      },
      {
        level: '중길',
        color: '#ffe66d',
        emoji: '⭐',
        message: '평범하지만 안정적인 하루입니다. 무리하지 말고 차근차근 진행하세요.',
        details: ['계획대로 진행하면 좋습니다', '인내심이 필요합니다', '작은 노력이 큰 결과를 만듭니다']
      },
      {
        level: '소길',
        color: '#95e1d3',
        emoji: '💫',
        message: '조금 신중하게 행동해야 할 날입니다. 서두르지 마세요.',
        details: ['신중한 판단이 필요합니다', '작은 실수에 주의하세요', '시간을 두고 결정하세요']
      },
      {
        level: '흉',
        color: '#a8a8a8',
        emoji: '🌙',
        message: '오늘은 조금 조심스러운 하루입니다. 무리한 도전은 피하세요.',
        details: ['건강 관리에 신경 쓰세요', '중요한 결정은 미루는 것이 좋습니다', '휴식을 취하는 것이 좋습니다']
      }
    ]
    
    const fortuneIndex = Math.floor(seed / 20)
    return fortunes[fortuneIndex]
  }, [])

  const handleSubmit = useCallback((name, birthDate) => {
    // 데이터를 ref에 저장하고 광고 팝업 표시
    pendingDataRef.current = { name, birthDate }
    // 상태 업데이트를 직접 실행
    setShowAd(true)
  }, [])

  const handleAdClose = useCallback(() => {
    setShowAd(false)
    // 광고가 닫힌 후 운세 결과 표시
    const data = pendingDataRef.current
    if (data) {
      setTimeout(() => {
        setUserName(data.name)
        const fortuneData = generateFortune(data.birthDate)
        setFortune(fortuneData)
        pendingDataRef.current = null
      }, 100)
    }
  }, [generateFortune])


  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🔮 오늘의 운세</h1>
        {!fortune ? (
          <FortuneForm onSubmit={handleSubmit} />
        ) : (
          <FortuneResult fortune={fortune} userName={userName} onReset={() => setFortune(null)} />
        )}
      </div>
      {showAd && <AdPopup onClose={handleAdClose} />}
    </div>
  )
}

export default App
