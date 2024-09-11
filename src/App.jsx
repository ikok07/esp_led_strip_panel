import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import RoutesComponent from "./router/Routes.jsx";
import GlobalContextProvider from "./context/GlobalContext.jsx";

export default function App() {
  return <>
    <GlobalContextProvider>
      <BrowserRouter>
        <main className="font-jetbrains">
          <RoutesComponent />
        </main>
      </BrowserRouter>
    </GlobalContextProvider>
  </>
}