import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from "@/routes/index.jsx";
import {RouterProvider} from "react-router";
import {Provider} from "react-redux";
import store from "@/store/index.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={routes}/>
      </Provider>
  </StrictMode>,
)
