import { useEffect, useState } from "react"
import Select from "react-select"
import { API_URL } from "../config/config"

export default function ControlBar() {
    const [algs, setAlgs] = useState<string[]>([]);
    const [n, setN] = useState<string>("");

    useEffect(() => {
        fetch(API_URL+"/list")
            .then((res) => res.json())
            .then((data) => setAlgs(data));
    }, []);

    function handleNChange(e: any) {
        if (isNaN(e.target.value) && e.target.value !== "") {
            return;
        }

        setN(e.target.value);
    }

    return (
        <div className="control-bar">
            <div className="algorithm-form">
                <div className="algorithm-select">
                    <Select options={algs.map(alg => ({value: alg, label: alg}))} />
                </div>
                <div className="algorithm-n">
                    <input type="text" placeholder="n" value={n} onChange={handleNChange} />
                </div>
                <div className="algorithm-submit">

                </div>
            </div>
        </div>
    );
}
