import React from "react"
import Pill from "./Pill"

function Content(props) {
    return (
        <div>
            {props.list ? props.list.map((obj,i) => <Pill word={obj.word} amount={obj.amount} key={i}/>) : false }
        </div>
    )
}
export default Content