import React from 'react'
import classes from './GradeMeter.module.css'
import Progress from 'react-circle-progress-bar'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const GradeMeter = (props) => {
  return (
    <div className={classes.circle}>
      <CircularProgressbarWithChildren
        value={props.progress}
        strokeWidth={5}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: `#96503f`,
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      >
        <div className={classes.circle_container}>
          <h1>{props.progress}</h1>
          <p>Out of 60</p>
        </div>
      </CircularProgressbarWithChildren>;
    </div>
  )
}
export default GradeMeter
