import { useEffect, useState } from "react"
import ControlBar from "./ControlBar"
import Visualizer from "./Visualizer"

export default function App() {
    const [data, setData] = useState<number[][]>([]);
    const [playing, setPlaying] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const [stepData, setStepData] = useState<number[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            setPlaying(false);
            setStep(0);
            setStepData(data[0]);
        }
    }, [data]);

    useEffect(() => {
        if (step < 0) {
            setStep(0);
        } else if (step < data.length) {
            setStepData(data[step]);
        }
    }, [step]);

    return (
        <div className="app">
            <Visualizer playing={playing} stepData={stepData} />
            <ControlBar setData={setData} setPlaying={setPlaying} setStep={setStep} playing={playing} step={step} />
        </div>
    );
}
