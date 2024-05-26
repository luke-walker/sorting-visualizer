import { useEffect, useState, Dispatch, SetStateAction } from "react"
import Select from "react-select"
import { API_URL } from "../config/config"

export default function ControlBar({ setData } : { setData: Dispatch<SetStateAction<number[][]>> } ) {
    const [algList, setAlgList] = useState<string[]>([]);
    const [alg, setAlg] = useState<string>("");
    const [n, setN] = useState<string>("");

    useEffect(() => {
        fetch(API_URL+"/list")
            .then((res) => res.json())
            .then((data) => setAlgList(data));
    }, []);

    function handleAlgChange(e: any) {
        setAlg(e.value);
    }

    function handleNChange(e: any) {
        if (isNaN(e.target.value) && e.target.value !== "") {
            return;
        }

        setN(e.target.value);
    }

    function handleSubmitClick() {
        fetch(`${API_URL}/sort/${alg}/${n}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }

    return (
        <div className="control-bar">
            <div className="algorithm-form">
                <div className="algorithm-select">
                    <Select placeholder="Select algorithm" options={algList.map(x => ({value: x, label: x}))} 
                        onChange={handleAlgChange} />
                </div>
                <div className="algorithm-n">
                    <input type="text" placeholder="n" value={n} onChange={handleNChange} />
                </div>
                <div className="algorithm-submit">
                    <button onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}
