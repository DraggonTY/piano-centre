
import * as React from "react"

const MOBILE_BREAKPOINT = 768 // Standard mobile breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    
    // Set initial value
    setIsMobile(mql.matches)
    
    // Listen for changes
    mql.addEventListener("change", onChange)
    
    // Also listen for orientation changes specifically
    const handleOrientationChange = () => {
      // Small delay to ensure dimensions have updated
      setTimeout(() => {
        setIsMobile(window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches)
      }, 100)
    }
    
    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleOrientationChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleOrientationChange)
    }
  }, [])

  return isMobile
}
