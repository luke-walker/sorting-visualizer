import "./Visualizer.css"

export default function Visualizer({ step } : { step: number[] }) {
    return (
        <div className="visualizer">
            {step.length > 0 && step.map((num) =>
                <div className="data-bar" key={num} style={{height: num}} />
            )}
        </div>
    );
}
