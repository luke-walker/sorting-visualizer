import { useEffect, useState } from "react"
import ControlBar from "./ControlBar"
import Visualizer from "./Visualizer"

export default function App() {
    const [data, setData] = useState<number[][]>([]);
    const [step, setStep] = useState<number[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            setStep(data[0]);
        }
    }, [data]);

    return (
        <div className="app">
            <Visualizer step={step} />
            <ControlBar setData={setData} />
        </div>
    );
}
