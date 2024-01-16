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
import { ToastContainer,toast } from 'react-toastify'
import { baseURL } from '../../../util'



const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const tableHeading = [{ heading: 'Documents' }]
const tableKeys = ['document']


const LoanApprovals = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const token = cookies.get('hr_head_token')
  const restructureLoan = (month) => {


    const headers = { "Authorization": "Bearer " + token }
    axios.post(baseURL+"api/restructureLoans", {
      loan_id: id,
      month: month
    }, { headers }).then((response) => {
      if (response) {
        toast.success('Loan Approved Successfully!')
        setTimeout(() => {
          window.location.reload(false)
        }, 1000);
      }
    })

  }

  const [data, setData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchLeave } = useHttp()
  const { sendRequest: fetchLoanHistory } = useHttp()
  const { id, employee_id } = useParams()
  const [div_data, setDivData] = useState([])
  const [leave_info, setLeaveInfo] = useState(null)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [reason, setReason] = useState(null)
  const [loanEMIData, setLoanEMIData] = useState([])
  const [loanData, setLoanData] = useState([])

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
      leaveDetails[0].loan_repayment.forEach((data) => {
        if (data.status === 'Paid') {
          data.restructure = false
        }
        else {
          data.restructure = true
        }
      })
      setLoanEMIData(leaveDetails[0].loan_repayment)
      setLoanData(leaveDetails)
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
        }, {

          title: 'Request Date',
          value: leaveDetails[0].date.split(" ")[0].split("-").reverse().join("-")
        }
      ])
      if (leaveDetails[0].document !== null) {

        setData([{
          document: leaveDetails[0]?.document
        }])
      }
    }
    const listLoans = (loanDetails) => {
      setLoanData(loanDetails)
    }
    fetchLeave({ url: baseURL + "api/getLoan?id=" + id }, listLeave)
    fetchLoanHistory({ url: baseURL + "api/getLoansHistory?employee_id=" + employee_id }, listLoans)
  }, [])
  // console.log(data)
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']
  function approve(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLoanStatus/" + id, {

      "status": "Approved",
      "rejection_reason": null

    }, { headers }).then((response) => {
      if (response.status===200) {
        toast('Loan Approved Successfully')
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      }
    })

  }
  function cancel(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLoanStatus/" + id, {

      "status": "Rejected",
      "rejection_reason": reason

    }, { headers }).then((response) => {
      if (response.status===200) {
        toast('Loan Rejected Successfully')
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      }
    })


  }
  const loan_table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Tenure' },
    
  ]
  const loan_table_keys = ['amount', 'tenure', ]
  return (
    <React.Fragment>
      <Heading heading={'Loan Approvals'} />
      <ToastContainer></ToastContainer>
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Loan Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} func2={setReason} />
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
      {loanData.length>0&&<Link to={'/emi_details_all_loans/' + employee_id} className='uni_link'>View All</Link>}
      <MainTable restructureLoan={restructureLoan} headings={loan_table_headings} keys={loan_table_keys} data={loanData} height={true} Lnk2={true} link1={'/loan_emi_details'} />

      <BottomButtonContainer cancel={'Reject'} approve={'Approve'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default LoanApprovals 