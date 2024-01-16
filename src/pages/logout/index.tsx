import Loader from "@/components/loader"
import { useAppDispatch } from "@/hooks/redux"
import { logoutUser } from "@/store/actions/authAction"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const Logout = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(logoutUser()).then((res) => {
      localStorage.clear()
      navigate("/auth")
      window.location.reload()
    })
  }, [])

  return <Loader />
}

export default Logout
