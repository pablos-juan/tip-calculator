import Lottie from 'lottie-react'
import animation from '../../public/images/animation-logo.json'
import { useEffect, useRef } from 'react'

export function Logo () {
  const animationRef = useRef()

  useEffect(() => {
    animationRef.current?.play()

    const handleClick = (event) => {
      if (event.target.tagName === 'BUTTON') {
        animationRef.current?.stop()
        animationRef.current?.play()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div style={{ width: 130, height: 130 }}>
      <Lottie
        animationData={animation}
        lottieRef={animationRef}
        loop={false}
        autoplay={false}
      />
    </div>
  )
}
