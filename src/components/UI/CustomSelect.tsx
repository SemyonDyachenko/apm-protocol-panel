import React from "react"

type Props = {
  value?: number | string | boolean
  children: React.ReactNode
  setValue: (val: any) => void
  className?: string
}

const CustomSelect = ({ children, value, setValue, className }: Props) => {
  return (
    <select
      className={`${className} rounded-xl border-[1px] border-lightblue-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none`}
      onChange={(e) => setValue(e.target.value)}
      value={value?.toString()}
    >
      {children}
    </select>
  )
}

export default CustomSelect
