import React from 'react'
import classes from './SalarySlip.module.css'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'

const SalarySlip = () => {

    const inputs = [
        {
            title: 'Emp Id',
            id: 'emp_id',
            ph: ''
        },
        {
            title: 'Name',
            id: 'name',
            ph: ''
        },
        {
            title: 'Floor',
            id: 'floor',
            ph: ''
        },
        {
            title: 'location',
            id: 'location',
            ph: ''
        },
        {
            title: 'Designation',
            id: 'designation',
            ph: ''
        },
        {
            title: 'Month',
            id: 'month',
            ph: ''
        },
        {
            title: 'Year',
            id: 'year',
            ph: ''
        },
    ]


    return (
        <React.Fragment>
            <Heading heading='Make a Salary Slip' />
        <br />
            <div className={classes.inner_container}>
                {inputs.map((element,index)=>(
                    <LabeledInput key={index} title={element.title} id={element.id} ph={element.ph} cls={true} img={false} />
                ))
                }
            </div>
            <br />
            <BottomButtonContainer cancel={'Back'} approve={'Make a Salary Slip'} />
        </React.Fragment>
    )
}

export default SalarySlip