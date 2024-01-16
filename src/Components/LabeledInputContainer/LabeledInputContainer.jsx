
import LabeledInput from '../LabeledInput/LabeledInput'
import classes from './LabeledInputContainer.module.css'

const LabeledInputContainer = (props) => {

  const childValues = data =>{
    props.func(data)
  }

  return (
    <div className='uni_container'>
        <h3 className='uni_heading'>Timing and Date Correction</h3>
        <div className={classes.input_container}>
            <LabeledInput func2={childValues} img={false} title={'Time'} type={'time'} id={'time'} timeInput={props.timeInput} />
            <LabeledInput func2={childValues} img={false} title={'Date'} type={'date'} id={'date'} value={props?.date} disabled={true}/>
        </div>
    </div>
  )
}

export default LabeledInputContainer