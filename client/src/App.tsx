import { useEffect, useState } from "react"
import Select from "react-select"
import { API_URL } from "../config/config"
import "./App.css"

export default function App() {
    const [algList, setAlgList] = useState<string[]>([]);
    const [alg, setAlg] = useState<string>("");
    const [n, setN] = useState<string>("");
    const [sortData, setSortData] = useState<number[][]>([]);
    const [step, setStep] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

    function lastStep() {
        if (step > 0) {
            setStep(step => step - 1);
        }
    }

    function nextStep() {
        if (step < sortData.length - 1) {
            setStep(step => step + 1);
        }
    }

    function handleAlgChange(e: any): void {
        setAlg(e.value);
    }

    function handleNChange(e: any): void {
        const val = e.target.value;

        if (isNaN(val) && val !== "") {
            return;
        }

        setN(val);
    }

    function handleSubmitClick(): void {
        if (alg === "" || n === "") {
            return;
        }

        fetch(`${API_URL}/sort/${alg}/${n}`)
            .then(res => res.json())
            .then(data => setSortData(data));
    }

    function handlePrevClick(): void {
        lastStep();
    }

    function handleNextClick(): void {
        nextStep();
    }

    function handlePauseClick(): void {
        setPlaying(false);
    }

    function handlePlayClick(): void {
        setPlaying(true);
    }

    useEffect(() => {
        fetch(`${API_URL}/list`)
            .then(res => res.json())
            .then(data => setAlgList(data));
    }, []);

    useEffect(() => {
        clearInterval(intervalId);

        if (playing) {
            setIntervalId(setInterval(() => {
                nextStep();
            }, 10));
        }

        return () => clearInterval(intervalId);
    }, [playing]);

    return (
        <div className="app">
            <div className="visualizer">
                {sortData.length > 0 && step < sortData.length &&
                    sortData[step].map(num => (
                        <div className="data-bar" key={num} style={{height: num}} />
                    )
                )}
            </div>
            <div className="algorithm-form">
                <div className="algorithm-select">
                    <Select placeholder="Select algorithm" options={algList.map(x => ({value: x, label: x}))} onChange={handleAlgChange} />
                </div>
                <div className="algorithm-n">
                    <input type="text" placeholder="n" value={n} onChange={handleNChange} />
                </div>
                <div className="algorithm-submit">
                    <button onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
            <div className="control-bar">
                <div className="control-bar-prev">
                    <button onClick={handlePrevClick}>Prev</button>
                </div>
                {playing ?
                    <div className="control-bar-pause">
                        <button onClick={handlePauseClick}>Pause</button>
                    </div>
                :
                    <div className="control-bar-play">
                        <button onClick={handlePlayClick}>Play</button>
                    </div>
                }
                <div className="control-bar-next">
                    <button onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
}
