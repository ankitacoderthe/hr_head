import React from 'react'
import classes from './StepBar.module.css'

const StepBarDiv = (props) => {
    return <>
        <div className={`${classes.stepbar_div} ${props.inx === props.val ? classes.current_stepbar_div : ''} ${props.inx < props.val ? classes.done_stepbar_div : ''}`}>
            <div className={`${classes.stepbar_circle}`}>{props.index}</div>
            <h5>{props.heading}</h5>
        </div>
        {props.line &&
            <div className={`${classes.stepbar_line} ${props.inx < props.val ? classes.done_stepbar_line : ''}`}></div>
        }
    </>
}
const StepBar = (props) => {
    return (
        <div className={classes.stepbar_container}>
            <StepBarDiv inx={1} val={props.value} line={true} index={1} heading={'Personal Information'} />
            <StepBarDiv inx={2} val={props.value} line={true} index={2} heading={'Job Details'} />
            <StepBarDiv inx={3} val={props.value} index={3} line={false} heading={'Docum.'} />
        </div>
    )
}

export default StepBar