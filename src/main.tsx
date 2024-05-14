import React, { Suspense, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { version } from "../package.json"
import { RouterProvider } from "react-router"
import { router } from "./router"
import PageLoader from "./Loader/PageLoader"
import Auth from "./Auth"
import { Provider } from "react-redux"
import { persistore, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import "./styles/global.scss"
import "./styles/var.scss"
import { isMock } from "./constants";

async function enableMocking() {
  // 是否启用mocker
  if (import.meta.env.MODE === 'staging' || isMock) {
      const { worker } = await import('../mock/node')
      return worker.start({
          onUnhandledRequest: "bypass"
      })
  }else{
      return console.log("NODE_ENV is not staging") //不是集成模拟环境
  }
}

const App = () => {
    useEffect(() => {
        console.log(`%c Current Version: ${version}`, "color: red; font-size: 18px; ")
    }, [])
    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persistore}>
                    <Suspense fallback={<PageLoader />}>
                        <Auth>
                            <RouterProvider router={router}></RouterProvider>
                        </Auth>
                    </Suspense>
                </PersistGate> 
            </Provider>
        </React.StrictMode>
    )
}

const app = createRoot(document.getElementById("root") as Element)
enableMocking().then(() => {
    app.render(<App />)
})