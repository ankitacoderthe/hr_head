import React from 'react'
import classes from './LabeledSelect.module.css'


const LabeledSelect = (props) => {

    const valHandler = (e) => {
        props.selectedVal(e.target.value)
    }



    return (
        
        <div className={`${classes.input_div} ${props.cls ? classes.wd50 : ''}`} style={props.mr ? { marginRight: '0' } : {}}>
        
            <label htmlFor={props.select_id}>{props.title}</label>
            <select disabled={props.disabled} required={props?.required}  id={props.select_id ? props.select_id :''} value={props.value} onChange={(e)=>valHandler(e)}>
                <option  value="">Select...</option>
                {!props.usingid ? props.data?.map((val, index) => (
                    <option key={index} value={val.name}>{props.spl_name ? val[props.spl_name] : val.name}</option>
                )) : props.data?.map((val, index) => (
                    <option key={index} value={val.id}>{props.spl_name ? val[props.spl_name] : val.name}</option>
                ))}
            </select>
        </div>
           
    )
}

export default LabeledSelect