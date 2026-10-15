import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const LottiePlayer = ({ animationData, className }) => {
  const container = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    })

    // component  remove 
    return () => anim.destroy()
  }, [animationData])

  return <div ref={container} className={className} />
}

export default LottiePlayer