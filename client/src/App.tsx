import { useEffect, useState } from "react"
import { API_URL } from "../config/config"
import "./App.css"

export default function App() {
    const [algList, setAlgList] = useState<string[]>([]);
    const [alg, setAlg] = useState<string>("");
    const [n, setN] = useState<string>("");
    const [sortData, setSortData] = useState<number[][]>([]);
    const [step, setStep] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [timescale, setTimescale] = useState<number>(1.0);

    let intervalId: NodeJS.Timeout;

    function lastStep(): void {
        setStep(step => Math.max(step - 1, 0));
    }

    function nextStep(): void {
        setStep(step => Math.min(step + 1, sortData.length - 1));
    }

    function handleAlgChange(e: any): void {
        setAlg(e.target.value);
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
        if (step < sortData.length - 1) {
            setPlaying(true);
        }
    }

    function handleTimescaleChange(e: any): void {
        setTimescale(parseFloat(e.target.value));
    }

    useEffect(() => {
        fetch(`${API_URL}/list`)
            .then(res => res.json())
            .then(data => setAlgList(data));
    }, []);

    useEffect(() => {
        setStep(0);
        setPlaying(false);
        setTimescale(1.0);
    }, [sortData]);

    useEffect(() => {
        if (step === sortData.length - 1) { // are both of these necessary?
            setPlaying(false);
        }
    }, [step]);

    useEffect(() => {
        clearInterval(intervalId);

        if (!playing) {
            return;
        }

        intervalId = setInterval(() => {
            if (step === sortData.length - 1) { // ^^^^^^^^^^^^^^
                setPlaying(false);
            } else {
                nextStep();
            }
        }, 50 / timescale);

        return () => clearInterval(intervalId);
    }, [playing, timescale]);

    return (
        <div className="app">
            <div className="top-container">
                <div className="algorithm-form">
                    <div className="algorithm-select">
                        <select value={alg} onChange={handleAlgChange}>
                            {algList.map(x => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </select>
                    </div>
                    <div className="algorithm-n">
                        <input type="text" placeholder="n" value={n} onChange={handleNChange} />
                    </div>
                    <div className="algorithm-submit">
                        <button onClick={handleSubmitClick}>Submit</button>
                    </div>
                </div>
                {sortData.length > 0 &&
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
                        <div className="control-bar-timescale">
                            <input type="range" min="0.05" max="10.0" step="0.05" value={timescale} onChange={handleTimescaleChange} />
                            <p>Timescale: {timescale}x</p>
                        </div>
                    </div>
                }
            </div>
            <div className="visualizer">
                {sortData.length > 0 && step < sortData.length &&
                    sortData[step].map(num => (
                        <div className="data-bar" key={num} style={{height: num}} />
                    )
                )}
            </div>
        </div>
    );
}
