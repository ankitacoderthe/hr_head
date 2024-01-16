import React, { useState, useEffect } from 'react'
import MainTable from '../../../Components/MainTable/MainTable'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heading from '../../../Components/Heading/Heading'
import classes from './LoanApprovals.module.css'
import { baseURL } from '../../../util'
const url=baseURL
const LoanEMIDetails = () => {
const {id}=useParams()
const cookies=new Cookies()
const token=cookies.get('shr_head_token')
const [loanEMIData,setLoanEMIData]=useState([])
const [loanData,setLoanData]=useState([])
const headers = { "Authorization": "Bearer " + token }


const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
useEffect(()=>{
fetchData()
},[])
const table_headings = [
    { heading: 'EMI Amount' },
    { heading: 'Month' },
    { heading: 'Status' },
    { heading: '' }
  ]
const tableKeys=['amount','month','status','restructure']
const fetchData=()=>{
  axios.get(url + "api/getLoan?id=" + id,{headers}).then((response)=>{
    
    setLoanData(response.data)
    response.data[0].loan_repayment.forEach(element => {
        element.month=monthArray[element.month]
    });
    response.data[0].loan_repayment.forEach((data) => {
            if (data.status === 'Paid') {
              data.restructure = false
            }
            else {
              data.restructure = true
            }
          })
setLoanEMIData(response.data[0].loan_repayment)
})
}
const restructureLoan = (month) => {


  const headers = { "Authorization": "Bearer " + token }
  axios.post(url+"api/restructureLoans", {
    loan_id: id,
    month: monthArray.indexOf(month)
  }, { headers }).then((response) => {
if(response){
fetchData()
}
  })

}
return(
    <React.Fragment>
          <Heading heading={'Loan EMI Details'} />
          <div className={`${classes.container} ${classes.lmd_container}`}>
                <div className={classes.container_heading}>Loan Amount</div>
                <div>{loanData[0]?.amount}</div>
                <div className={classes.container_heading}>Tenure</div>
                <div>{loanData[0]?.tenure}</div>
                <div className={classes.container_heading}>Approval Status</div>
                <div>{loanData[0]?.status}</div>
                <div className={classes.container_heading}>Start Month</div>
                <div>{loanEMIData[0]?.month}</div>
            </div>
            <br />
         <MainTable res={true} restructureLoan={restructureLoan} headings={table_headings} keys={tableKeys} data={loanEMIData} height={false} />
    </React.Fragment>
)


}
export default LoanEMIDetails 