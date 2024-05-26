import { useState } from "react"
import ControlBar from "./ControlBar"
import Visualizer from "./Visualizer"

export default function App() {
    const [data, setData] = useState<number[][]>([]);

    return (
        <div className="app">
            <Visualizer />
            <ControlBar setData={setData} />
        </div>
    );
}
