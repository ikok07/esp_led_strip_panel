import Box from "../ui/Box.jsx";
import {UilChannel, UilPalette, UilPower, UilSignal} from "@iconscout/react-unicons";
import {useGlobal} from "../../context/GlobalContext.jsx";
import {numToModeString} from "../../../utils/numToModeString.js";
import {numToStateString} from "../../../utils/numToStateString.js";

export default function Header() {
    const {connectionStatus, currentState, currentMode, currentColor} = useGlobal();

    const status = connectionStatus === 1 ? "Connected" : "Disconnected";
    const statusStyles = connectionStatus === 1 ? "text-green-600" : "text-red-600";

    const state = numToStateString(currentState);
    const stateStyles = currentState === 1 ? "text-green-600" : "text-red-600";

    return <div className="flex flex-col md:flex-row items-center gap-y-5 justify-evenly mt-7 pb-4 border-b border-gray-300">
        <Box Icon={UilSignal} label="Connection status">
            <small className={`text-2xl font-black ${statusStyles}`}>{status}</small>
        </Box>

        <Box Icon={UilPower} label="State">
            <small className={`text-2xl font-black ${stateStyles}`}>{state}</small>
        </Box>

        <Box Icon={UilChannel} label="Mode">
            <small className={`text-2xl font-black`}>{numToModeString(currentMode)}</small>
        </Box>

        <Box Icon={UilPalette} label="Color">
            <small className={`text-2xl font-black`} style={{color: currentColor}}>{currentColor}</small>
        </Box>
    </div>
}