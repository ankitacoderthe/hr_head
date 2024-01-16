import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './LoanApprovals.module.css'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { baseURL } from '../../../util'
const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const tableHeading = [{ heading: 'Documents' }]
const tableKeys = ['document']


const LoanDetails = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const token = cookies.get('hr_head_token')

  const [data, setData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchLoanHistory } = useHttp()
  const { sendRequest: fetchLeave } = useHttp()
  const { id, employee_id } = useParams()
  const [div_data, setDivData] = useState([])
  const [leave_info, setLeaveInfo] = useState(null)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [reason, setReason] = useState(null)
  const [loanEMIData, setLoanEMIData] = useState([])
  const [loanData, setLoanData] = useState([])
  const [status, setStatus] = useState(null)
  useEffect(() => {
    const listEmployeeDetails = (employeeDetails) => {
      setDivData([{
        title: "Name",
        value: employeeDetails.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeDetails.headEmployeesResult[0]?.head_employee_name
      }, {
        title: 'Designation',
        value: employeeDetails.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeDetails.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeDetails.employeesResult[0].gender

      }, {
        title: 'location name',
        value: employeeDetails.employeesResult[0].location_name
      }, {
        title: 'location Department',
        value: employeeDetails.employeesResult[0].store_department_name
      }])
    }
    fetchEmployeeDetails({ url: baseURL + "api/getEmployeeDetails?id=" + employee_id }, listEmployeeDetails)
    const listLeave = (leaveDetails) => {
      setStatus(leaveDetails[0].status)
      let loan_emis = leaveDetails[0].loan_repayment.map((data) => data.amount)
      let loan_string = ''
      loan_emis.forEach((data, index) => {
        if (index !== loan_emis.length - 1) {
          loan_string += "Rs " + data + ", "
        }
        else {
          loan_string += "Rs " + data
        }

      })
      
      setLeaveInfo([
        {
          title: 'Loan Amount',
          value: leaveDetails[0].amount
        },
        {
          title: 'Tenure',
          value: leaveDetails[0].tenure
        },
        {
          title: 'Loan EMI',
          value: loan_string
        },
        {
          title: 'Recall Head',
          value: leaveDetails[0].recall_head === 1 ? 'Yes' : 'No'
        },
        {
          title: 'Head Approval',
          value: leaveDetails[0].head_approval === 1 ? 'Yes' : 'NO'
        }
      ])
      setReason(leaveDetails[0]?.reason)
      if (leaveDetails[0].document !== null) {

        setData([{
          document: leaveDetails[0]?.document
        }])
      }
    }
    const listLoans = (loanDetails) => {
      loanDetails.forEach((data) => {
        data.start_month = monthArray[data.loan_repayment[0]?.month]
      })
      console.log(loanDetails)
      setLoanData(loanDetails)
    }
    fetchLoanHistory({ url: baseURL + "api/getLoansHistory?employee_id=" + employee_id }, listLoans)
    fetchLeave({ url: baseURL + "api/getLoan?id=" + id }, listLeave)
  }, [])
  // console.log(data)
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']
  function approve() {
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLoanStatus/" + id, {

      "status": "Approved",
      "rejection_reason": null

    }, { headers }).then((response) => {
      if (response) {
        navigate(-1)
      }
    })

  }
  function cancel() {
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLoanStatus/" + id, {

      "status": "Rejected",
      "rejection_reason": reason

    }, { headers }).then((response) => {
      if (response) {
        navigate(-1)
      }
    })


  }
  const loan_table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Tenure' },
    { heading: 'Start Month' }
  ]
  const loan_table_keys = ['amount', 'tenure', 'start_month',]
  return (
    <React.Fragment>
      <Heading heading={'Loan Approvals'} />
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Loan Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <div >
          <h5 style={{ marginTop: '20px', fontSize: '16px' }}>Reasons & Remarks</h5>
          <div style={{ marginTop: '10px', color: 'var(--bg)', fontWeight: '500' }}>
            {reason}
          </div>
        </div>
        <div >
          <h5 style={{ marginTop: '20px', fontSize: '16px' }}>Status</h5>
          <div style={{ marginTop: '10px', color: 'var(--bg)', fontWeight: '500' }}>
            {status}
          </div>
        </div>
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={false} />
      <br /><br />
      {/* <div className={classes.container}>
        <div>
          <div>Loan Amount</div>
          <div>{loanData[0]?.amount}</div>
        </div>
        <div>
          <div>Tenure</div>
          <div>{loanData[0]?.tenure}</div>
        </div>
        <div>
          <div>Approval Status</div>
          <div>{loanData[0]?.status}</div>
        </div>
        <div>
          <div>Month</div>
          <div>{monthArray[loanEMIData[0]?.month]}</div>
        </div>
      </div> */}

      <br />
      <Link className='uni_link' to={'/emi_details_all_loans/' + employee_id}>View All</Link>
      <MainTable headings={loan_table_headings} keys={loan_table_keys} data={loanData} height={true} Lnk2={true} link1={'/loan_emi_details'} />

      <button className={classes.bottom_btn} onClick={()=>navigate(-1)}>Back</button>

    </React.Fragment>
  )
}

export default LoanDetails 