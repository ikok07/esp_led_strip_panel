import ControlsSection from "../components/controls/ControlsSection.jsx";
import ColorPickerSection from "../components/color-picker/ColorPickerSection.jsx";
import Header from "../components/header/Header.jsx";
import {useGlobal} from "../context/GlobalContext.jsx";
import SpinnerFullPage from "../components/ui/SpinnerFullPage.jsx";
import ErrorContainer from "../components/ui/ErrorContainer.jsx";
import {UilWifiSlash} from "@iconscout/react-unicons";

export default function Home() {
    const {isConnecting, currentMode, connectionStatus} = useGlobal();

    if (isConnecting) {
        return <SpinnerFullPage />
    }

    if (connectionStatus === -1) {
        return <ErrorContainer Icon={UilWifiSlash}>
            Failed to connect to ESP Controller!
        </ErrorContainer>
    }

    return <div className="w-[90%] sm:max-w-[80rem] mx-auto mt-16">
        <h1 className={"text-5xl font-black text-center"}>ESP LED Controller</h1>

        <Header />
        <ControlsSection />
        {currentMode === 1 && <ColorPickerSection />}
    </div>
}