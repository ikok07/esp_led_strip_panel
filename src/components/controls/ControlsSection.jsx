import Box from "../ui/Box.jsx";
import {FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Switch} from "@mui/material";
import {UilChannel, UilPower} from "@iconscout/react-unicons";
import SectionHeading from "../ui/SectionHeading.jsx";
import {useGlobal} from "../../context/GlobalContext.jsx";

export default function ControlsSection() {
    const {currentState, currentMode, updateController} = useGlobal();

    function toggleState() {
        updateController({state: !currentState});
    }

    function setMode(mode) {
        updateController({mode});
    }

    return <div className="controls-section mt-10">
        <SectionHeading>Controls</SectionHeading>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-5">
            <Box Icon={UilPower} label="Current state">
                <FormGroup>
                    <FormControlLabel control={<Switch checked={currentState === 1} onClick={toggleState} /> } label="On" />
                </FormGroup>
            </Box>
            <Box Icon={UilChannel} label="Mode">
                <FormControl className="radio-controls">
                    <RadioGroup
                        value={currentMode}
                    >
                        <div className="flex">
                            <FormControlLabel onClick={() => setMode(0)} control={<Radio />} label="Rainbow" value={0} />
                            <FormControlLabel onClick={() => setMode(1)} control={<Radio />} label="Static" value={1} />
                        </div>
                    </RadioGroup>
                </FormControl>
            </Box>
        </div>
    </div>
}