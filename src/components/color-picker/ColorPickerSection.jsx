import SectionHeading from "../ui/SectionHeading.jsx";
import {MuiColorInput} from "mui-color-input";
import {useGlobal} from "../../context/GlobalContext.jsx";
import hexToRGB from "../../../utils/hexToRGB.js";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "@mui/material";
import {SketchPicker} from "react-color";

export default function ColorPickerSection() {
    const {currentColor, updateController} = useGlobal();
    const [selectedColor, setSelectedColor] = useState(currentColor);

    function setColor(color) {
        setSelectedColor(color.hex)
        updateController({color: {red: color.rgb.r, green: color.rgb.g, blue: color.rgb.b}});
    }

    useEffect(() => {
        setSelectedColor(currentColor)
    }, [currentColor])

    return <div className="color-picker my-10 flex flex-col items-center sm:items-start">
        <SectionHeading>Color Selection</SectionHeading>

        {/*<MuiColorInput format="hex" value={selectedColor} onChange={setColor}/>*/}
        <SketchPicker color={selectedColor} onChangeComplete={setColor}/>
    </div>
}