import "./styles/Pill.css"

function Pill(props) {
    return (
        <div className="Pill">
            <span>{props.word}</span>
            <span>{props.amount}</span>
        </div>
    )
}
export default Pill