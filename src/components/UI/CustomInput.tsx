import React from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  type: string
  pattern?: string
}

const CustomInput = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  className,
  type,
  pattern,
}: Props) => {
  return (
    <div>
      {label && <div className="py-1 text-[13px] text-gray-400">{label}:</div>}
      <input
        className={`text-md rounded-lg border-[1px] border-lightblue-200 bg-white px-4 py-1 text-lightblue-200 outline-none transition focus:text-gray-700 ${className}`}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}

export default CustomInput
