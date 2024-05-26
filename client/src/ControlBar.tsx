import { useEffect, useState, Dispatch, SetStateAction } from "react"
import Select from "react-select"
import { API_URL } from "../config/config"

export default function ControlBar({ setData, setPlaying, setStep, controls, playing, step }: {
    setData: Dispatch<SetStateAction<number[][]>>,
    setPlaying: Dispatch<SetStateAction<boolean>>,
    setStep: Dispatch<SetStateAction<number>>,
    controls: boolean,
    playing: boolean,
    step: number
}) {
    const [algList, setAlgList] = useState<string[]>([]);
    const [alg, setAlg] = useState<string>("");
    const [n, setN] = useState<string>("");

    useEffect(() => {
        fetch(`${API_URL}/list`)
            .then((res) => res.json())
            .then((data) => setAlgList(data));
    }, []);

    function handleAlgChange(e: any): void {
        setAlg(e.value);
    }

    function handleNChange(e: any): void {
        if (isNaN(e.target.value) && e.target.value !== "") {
            return;
        }

        setN(e.target.value);
    }

    function handleSubmitClick(): void {
        fetch(`${API_URL}/sort/${alg}/${n}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }

    function handlePrevClick(): void {
        setStep(step-1);
    }

    function handleNextClick(): void {
        setStep(step+1);
    }
    
    function handlePauseClick(): void {
        setPlaying(false);
    }

    function handlePlayClick(): void {
        setPlaying(true);
    }

    return (
        <div className="control-bar">
            <div className="algorithm-form">
                <div className="algorithm-select">
                    <Select placeholder="Select algorithm" options={algList.map((x) => ({value: x, label: x}))} 
                        onChange={handleAlgChange} />
                </div>
                <div className="algorithm-n">
                    <input type="text" placeholder="n" value={n} onChange={handleNChange} />
                </div>
                <div className="algorithm-submit">
                    <button onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
            {controls &&
                <>
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
                </>
            }
        </div>
    );
}
