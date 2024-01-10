import { useState } from "react"

type Props = {
  className: string
  isChecked: boolean
  changeState: (val: boolean) => void
  register?: any
}

const Checkbox = ({ className, isChecked, changeState, register }: Props) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={() => changeState(!isChecked)}
        {...register}
      />
      <span
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
      />
    </label>
  )
}

export default Checkbox
