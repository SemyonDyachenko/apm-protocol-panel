import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { setupStore } from "./store/store.js"
import { Provider } from "react-redux"

const store = setupStore()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
