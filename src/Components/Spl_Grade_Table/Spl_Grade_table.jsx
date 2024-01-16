import React from 'react'
import classes from './Spl_Grade_table.module.css'

const Spl_Grade_table = (props) => {
    
    // console.log(props.marks)
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <span>Criteria</span>
                <span>{props.t2?props.t2:'Marks'}</span>
            </div>
           {props.marks.map((element,index)=>{
          return  (<div key={index} className={classes.body}>
                <div className={classes.body_div}>
                    <span>{element.title} </span>
                    <span>{element.value}</span>
                </div>
                </div>)
           })}
                
                {/* <div className={classes.body_div}>
                    <span>COM Grade </span>
                    <span>{props?.systemMarks?.COM_Grade}</span>
                </div>
                <div className={classes.body_div}>
                    <span>Fine Marks </span>
                    <span>{props?.systemMarks?.Fine_Marks}</span>
                </div> */}
            
           
            {
                props.children
            }
        </div>
    )
}

export default Spl_Grade_table