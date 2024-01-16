import React,{useState} from 'react'
import classes from './GradeRangeSlider.module.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import './GradeRange.css'

const GradeRangeSlider = (props) => {

    const [state, setState] = useState(0)
    const handleChange = value => {
      setState(
        value
      )
      props.selectValue(value)
    }
    const Labels = {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10"
  
    }

    return (
        <div className={classes.container}>
            <h3>{props.label}</h3>
            <p>Choose your option</p>
            <Slider
                min={0}
                max={10}
                orientation='horizontal'
                value={state}
                labels={Labels}
                handleLabel={state}
                onChange={handleChange}
                className={classes.slider}
            />
        </div>
    )
}

export default GradeRangeSlider
