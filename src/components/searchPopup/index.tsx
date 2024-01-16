import { motion } from "framer-motion"
import React, { useEffect, useRef } from "react"

type Props = {
  active: boolean
  closeFunc: () => void
}

const SearchPopup = ({ active, closeFunc }: Props) => {
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
      ref={popupRef}
      hidden={!active}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ amount: 0.5 }}
      className="absolute mt-2 h-auto rounded-2xl border-[1px] bg-white  shadow-md
   md:w-[340px]"
    >
      <div className="p-5">asdasd</div>
    </motion.div>
  )
}

export default SearchPopup
