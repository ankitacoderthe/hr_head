import React from 'react'
import classes from './SalarySlip2.module.css'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'

const div_data = [
  {
    title: "Name",
    value: 'Puneet Shrivastav'
  },
  {
    title: "Department",
    value: 'Child'
  },
  {
    title: "Emp No",
    value: 424
  },
  {
    title: "Bank Name",
    value: 'PNB Bank'
  },
  {
    title: "Designation",
    value: 'Store Manager'
  },
  {
    title: "Account No",
    value: '01125902590'
  },
]

const SalarySlip2 = () => {
  return (
    <React.Fragment>
      <div className={classes.module_header}>
        <h2>NARANG GARMENTES</h2>
        <h5>Salary Slip For March 2023</h5>
      </div>
      <DetailsDivContainer data={div_data} />
    </React.Fragment>
  )
}

export default SalarySlip2