import ActionButton from "@/components/UI/ActionButton"
import CustomInput from "@/components/UI/CustomInput"
import YandexLogo from "/assets/vector/yandex.svg"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { loginUser } from "@/store/actions/authAction"
import Loader from "@/components/loader"
import { useNavigate } from "react-router-dom"

type Props = {}

const LoginPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const isAuth = localStorage.getItem("apm_protocols_token")

  const onSumbit = () => {
    try {
      dispatch(loginUser(email, password)).then((res) => {
        if (res) {
          if (res.status === 401) {
            setError(true)
          } else if (res.status === 200) {
            setIsLoading(true)
            setTimeout(() => {
              navigate("/")
              window.location.reload()
            }, 1500)
          }
        }
      })
    } catch (error: Error | any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/")
      window.location.reload()
    }
  }, [])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-secondary-600 to-gray-700">
      {isLoading ? (
        <div className="h-screen w-screen bg-white  px-10 py-10 shadow-md md:h-auto md:w-auto md:rounded-xl">
          <Loader />
        </div>
      ) : (
        <div className=" z-[10] h-screen w-screen bg-white  px-10 py-10 shadow-md md:h-auto md:w-auto md:rounded-xl">
          <form
            className=" w-full md:rounded-lg"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="mb-2">
              <img
                className="max-w-[120px]"
                src={"https://apm-league.ru/assets/logo/blacklogo.png"}
                alt="image"
              />
            </div>
            <div className="w-full pb-6 pt-8 text-2xl font-bold text-gray-700">
              Войдите в аккаунт
              <div className="font- text-sm font-normal text-gray-400">
                Чтобы использовать сервис
              </div>
            </div>
            <div className="w-full">
              <CustomInput
                value={email}
                onChange={setEmail}
                className={`w-full  rounded-lg px-5 py-[8px] md:min-w-[400px] ${
                  error && "border-primary-500"
                }`}
                label="E-mail"
                type="email"
              />
            </div>
            <div className="my-2 w-full">
              <CustomInput
                value={password}
                onChange={setPassword}
                className={`w-full rounded-lg  px-5 py-[8px] md:min-w-[400px] ${
                  error && "border-primary-500"
                }`}
                label="Пароль"
                type="password"
              />
            </div>
            <div hidden={!error} className="text-sm text-primary-500">
              Введен неверный E-mail или пароль
            </div>
            <div className="w-full">
              <ActionButton
                className="my-4 w-full rounded-lg py-3 font-semibold shadow-xl"
                onClick={onSumbit}
              >
                Войти
              </ActionButton>
            </div>
            <div className="my-4 flex items-center justify-between gap-4">
              <div className="h-[1px] w-1/2 bg-gray-200"></div>
              <div className="text-gray-400">или</div>
              <div className="h-[1px] w-1/2 bg-gray-200"></div>
            </div>
          </form>
          <div className="">
            <button className="rounded- flex w-full items-center justify-center gap-4 rounded-lg bg-black px-4 py-3">
              <div>
                <img src={YandexLogo} alt="photo" />
              </div>
              <div className="text-sm font-medium text-white">
                Войти с Яндекс ID
              </div>
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
            Нет учетной записи ?
            <a
              className="text-secondary-500 underline transition hover:text-secondary-600"
              href="https://apm-league.ru/signup"
            >
              Регистрация
            </a>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[13px] text-gray-400">
            <div className="cursor-pointer transition hover:underline">
              Главная
            </div>
            <div className="cursor-pointer transition hover:underline">
              Поддержка
            </div>
            <div className="cursor-pointer transition hover:underline">
              Правила
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage
