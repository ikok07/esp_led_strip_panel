import {Provider} from "react-redux";
import store from "./store/store.js";
import {BrowserRouter} from "react-router-dom";
import RoutesComponent from "./router/Routes.jsx";

export default function App() {
  return <>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <RoutesComponent />
        </div>
      </BrowserRouter>
    </Provider>
  </>
}