import React from 'react'
import classes from './CalendarBottomDiv.module.css'
import { Link } from 'react-router-dom'


const CalDiv = (props) => {
    return <div className={classes.caldiv}>
        {props.p == 'Total Fine' ? <Link className={classes.a_tag} to={`/fine_details/${props.id}/${props.month}/${props.year}`}>{props.p}</Link> : props.p == 'Total Commission' ? <Link className={classes.a_tag} to={`/commission_details/${props.empID}/${props.month}/${props.year}/${props.id}`}>{props.p}</Link>: <p>{props.p}</p>}
        <h1>{props.h1}</h1>
        <div style={{ background: props.bg }}></div>
    </div>
}


const CalendarBottomDiv = (props) => {
    return (
        <div className={classes.container}>
            {props.data.map((element, index) => (
                <CalDiv id={props.id} p={element.p} h1={element.h1} bg={element.bg} month={props.month} year={props.year} empID={props.empID} />
            ))}
        </div>
    )
}

export default CalendarBottomDiv
