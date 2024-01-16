import { MotionStyle, motion } from "framer-motion"
import React, { useEffect, useRef } from "react"

type Props = {
  active: boolean
  closeFunc: () => void
  children: React.ReactNode
  className?: string
  style?: MotionStyle
}

const Popup = ({ active, closeFunc, children, className, style }: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        closeFunc()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <motion.div
      style={style}
      ref={popupRef}
      hidden={!active}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ amount: 0.5 }}
      className={`absolute ${className} h-auto shadow-md
   `}
    >
      {children}
    </motion.div>
  )
}

export default Popup
