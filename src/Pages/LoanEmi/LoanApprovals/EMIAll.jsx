import React, { useState, useEffect } from 'react'
import MainTable from '../../../Components/MainTable/MainTable'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import classes from './LoanApprovals.module.css'
import Heading from '../../../Components/Heading/Heading'
import { baseURL } from '../../../util'
const EMIAll = () => {
const {employee_id}=useParams()
const cookies=new Cookies()
const token=cookies.get('hr_head_token')
const [loanEMIData,setLoanEMIData]=useState([])
const [loanData,setLoanData]=useState([])
const headers = { "Authorization": "Bearer " + token }
const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const restructureLoan = (month,id) => {
let monthIndex=monthArray.findIndex((data)=>{
  return data===month
})

  const headers = { "Authorization": "Bearer " + token }
  axios.post(baseURL+"api/restructureLoans", {
    loan_id: id,
    month: monthIndex
  }, { headers }).then((response) => {
if(response.status===200){
fetchData()
}
  })

}
function fetchData(){
  axios.get(baseURL + "api/getLoansHistory?employee_id=" + employee_id,{headers}).then((response)=>{
    
    var loanRepaymentData=response.data.map((data)=>{
        let obj={}
        obj.loan_repayment=data.loan_repayment
        return obj
    })
  setLoanData(response.data)
    loanRepaymentData.forEach((data)=>{
        data.loan_repayment.forEach(element => {
            element.month=monthArray[element.month]
            if (element.status === 'Paid') {
                element.restructure = false
              }
              else {
                element.restructure = true
              }
        });

    })
    console.log(loanData)
    setLoanEMIData(loanRepaymentData)
})
}
useEffect(()=>{
fetchData()
},[])
console.log(loanEMIData)
const table_headings = [
    { heading: 'EMI Amount' },
    { heading: 'Month' },
    { heading: 'Status' }
  ]
const tableKeys=['amount','month','status']
return(
    <React.Fragment>
          <Heading heading={'Loan EMI Details'} />
          {
            loanEMIData.map((data,index)=>{
             return(<div>
             <div className={classes.container}>
             <div className={classes.container_heading}>Loan Amount</div>
             <div>{loanData[index]?.amount}</div>
             <div className={classes.container_heading}>Tenure</div>
             <div>{loanData[index]?.tenure}</div>
             <div className={classes.container_heading}>Approval Status</div>
             <div>{loanData[index]?.status}</div>
             <div className={classes.container_heading}>Start Month</div>
             <div>{data.loan_repayment[0]?.month}</div>
         </div>
             <div> <span>Loan No {index+1}</span>    <MainTable res={true}  restructureLoan={(month)=>restructureLoan(month,loanData[index].id)} headings={table_headings} keys={tableKeys} data={data.loan_repayment} height={false} /></div>
             </div>)})
          }
        
    </React.Fragment>
)


}
export default EMIAll 