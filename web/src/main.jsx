import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import routes from "./routes/index.jsx";
import {Provider} from "react-redux";
import store from "store/index.jsx";
import 'simplebar-react/dist/simplebar.min.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={routes}/>
  </Provider>,
)
