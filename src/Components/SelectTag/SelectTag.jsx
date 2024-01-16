import classes from './SelectTag.module.css'
import Img from '../../assets/vector9.png'
import { useState } from 'react'
import { useEffect } from 'react'


const SelectTag = (props) => {
const [value,setValue]=useState(props.month)
    const valHandler = (e) => {
        console.log(e)
        props.selectedVal(e.target.value)
    }

    const callParentFunction = (e) => {
       setValue(e.target.value)
    }
useEffect(()=>{
    if(optionData===null||optionData===undefined)
    props.parentFunc(value)
},[value])
    const optionData = props.data;

    return (
        <div className={classes.select_div}>
            <img src={props.img} className={classes.select_img} alt="" />
            {optionData ?
                <select value={props.value}  required={props?.required} name='select'  className={classes.select} onChange={(e)=>valHandler(e)} id={props.select_id ? props.select_id :''}>
                    <option value={null}>{props.title}</option>
                    {!props.usingid ? optionData.map((val, index) => (
                        <option key={index} value={val.name}>{val.name}</option>
                    )) : optionData.map((val, index) => (
                        <option key={index} value={val.id}>{val.name}</option>
                    )) }
                </select> :
                <select value={value}  required={props?.required} onChange={(e)=>callParentFunction(e)} className={classes.select} id={props.select_id ? props.select_id :''}>
                    <option  value={0}>Janaury</option>
                    <option value={1}>February</option>
                    <option value={2}>March</option>
                    <option value={3}>April</option>
                    <option value={4}>May</option>
                    <option value={5}>June</option>
                    <option value={6}>July</option>
                    <option value={7}>August</option>
                    <option value={8}>September</option>
                    <option value={9}>October</option>
                    <option value={10}>November</option>
                    <option value={11}>December</option>
                </select>
            }
            <img src={Img} className={classes.down_arrow} alt="down_arrow" />
        </div>
    )
}

export default SelectTag