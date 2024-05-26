import { useEffect, useState } from "react"
import ControlBar from "./ControlBar"
import Visualizer from "./Visualizer"

export default function App() {
    const [data, setData] = useState<number[][]>([]);
    const [step, setStep] = useState<number>(0);
    const [stepData, setStepData] = useState<number[]>([]);
    const [controls, setControls] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (data.length > 0) {
            setStep(0);
            setStepData(data[0]);
            setControls(true);
            setPlaying(false);
        }
    }, [data]);

    useEffect(() => {
        if (step < 0) {
            setStep(0);
        } else if (step > data.length) {
            setStep(data.length-1);
        } else if (data.length > 0) {
            setStepData(data[step]);
        }
    }, [step]);

    return (
        <div className="app">
            <Visualizer playing={playing} stepData={stepData} />
            <ControlBar setData={setData} setPlaying={setPlaying} setStep={setStep} controls={controls} playing={playing} step={step} />
        </div>
    );
}
