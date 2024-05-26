import "./Visualizer.css"

export default function Visualizer({ playing, stepData } : { playing: boolean, stepData: number[] }) {
    return (
        <div className="visualizer">
            {stepData.map((num) =>
                <div className="data-bar" key={num} style={{height: num}} />
            )}
        </div>
    );
}
