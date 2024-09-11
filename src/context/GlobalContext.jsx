import {createContext, useContext, useEffect, useState} from "react";
import mqtt from "mqtt"
import {rgbToHex} from "@mui/material";
import hexToRGB from "../../utils/hexToRGB.js";

const GlobalContext = createContext();

function GlobalContextProvider({children}) {
    const [client, setClient] = useState(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState(-1);
    const [currentState, setCurrentState] = useState(-1);
    const [currentMode, setCurrentMode] = useState(-1);
    const [currentColor, setCurrentColor] = useState("#000000")

    function connectToController() {
        const newClient = mqtt.connect(import.meta.env.VITE_MQTT_HOST, {
            username: import.meta.env.VITE_MQTT_USERNAME,
            password: import.meta.env.VITE_MQTT_PASSWORD
        })
        setClient(newClient);
        newClient.on("connect", () => {
            console.log("Connected to MQQT Broker!")
            newClient.subscribe(import.meta.env.VITE_MQTT_SUBSCRIBE_TOPIC, () => {
                console.log("Subscribed to MQTT topic!")
            })
        })

        newClient.on("error", (err) => {
            console.log(`MQTT ERROR: ${err.message}`)
            setConnectionStatus(0);
        })

        newClient.on("message", (topic, message) => {
            try {
                const json = JSON.parse(message);
                if (json.tag !== import.meta.env.VITE_MQTT_TARGET_TAG) return;
                if (json.state !== undefined) setCurrentState(json.state);
                if (json.mode !== undefined) setCurrentMode(json.mode)
                if (json.color) setCurrentColor(rgbToHex(`rgb(${json.color.red},${json.color.green},${json.color.blue})`))
                setConnectionStatus(1);
                setIsConnecting(false);
            } catch (err) {
                setConnectionStatus(0);
                console.log(`Failed to parse JSON message! Error: ${err}`)
            }
        })

        setTimeout(() => setIsConnecting(false), 3000)
    }

    function updateController({state, mode, color}) {
        if (!client) return;
        const object = {
            tag: "led_strip",
            state: +currentState,
            mode: +currentMode,
            color: hexToRGB(currentColor)
        };

        if (state !== undefined) object["state"] = +state;
        if (state !== undefined) setCurrentState(+state);

        if (mode !== undefined) object["mode"] = +mode;
        if (mode !== undefined) setCurrentMode(+mode);

        if (color) object["color"] = color ? color : hexToRGB(currentColor);
        if (color) setCurrentColor(rgbToHex(`rgb(${color.red},${color.green},${color.blue})`));

        console.log(object)
        client.publish(import.meta.env.VITE_MQTT_PUBLISH_TOPIC, JSON.stringify(object));
    }

    useEffect(() => {
        connectToController();
    }, []);

    return <GlobalContext.Provider value={{
        isConnecting,
        connectionStatus,
        currentState,
        currentMode,
        currentColor,
        updateController
    }}>
        {children}
    </GlobalContext.Provider>
}

function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("Failed to load GlobalContext!");
    return context;
}

export default GlobalContextProvider
export {useGlobal}