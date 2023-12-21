import React, { useState, useEffect } from 'react'

const LoadingBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const progressInterval = ['0%', '10%', '70%', '70%', '95%', '100%']
  const progressTime = [0, 800, 1200, 200, 800, 400]

  const [fadeOut, setFadeOut] = useState<boolean>(false)

  useEffect(() => {
    if (progress < progressInterval.length - 1) {
      setTimeout(() => {
        setProgress(progress + 1)
      }, progressTime[progress])
    }
    else {
      setFadeOut(true)
    }
  }, [progress])

  return (
    <>
      <div className="loading-center"
        style={{
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <p className="loading-text">Loading...</p>
        <div className="loading-bar">
          <div className="loading-bar-inner"
            style={{
              width: progressInterval[progress],
              transition: `${progressTime[progress]}ms ease-out width`,
            }}></div>
        </div>
      </div>
    </>
  )
}

export default LoadingBar