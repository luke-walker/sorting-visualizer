import { useEffect, useState } from "react"
import Select from "react-select"
import { API_URL } from "../config/config.ts"

export default function ControlBar() {
    const [algs, setAlgs] = useState([]);

    useEffect(() => {
        fetch(API_URL+"/list")
            .then((res) => res.json())
            .then((data) => setAlgs(data));
    }, []);

    return (
        <div className="control-bar">
            <div className="algorithm-select">
                <Select options={algs.map(alg => ({value: alg, label: alg}))} />
            </div>
        </div>
    );
}
