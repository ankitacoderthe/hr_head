import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'

import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import classes from './AdvanceApprovals.module.css'
import { baseURL } from '../../../util'
const AdvanceDetails = () => {
  const [status,setStatus]=useState(null)
  const cookies = new Cookies();
  const navigate = useNavigate()
  const token = cookies.get('hr_head_token')
  const [data, setData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchLeave } = useHttp()
  const { id, employee_id } = useParams()
  const [div_data, setDivData] = useState([])
  const [leave_info, setLeaveInfo] = useState(null)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [reason, setReason] = useState(null)
  const headers={"Authorization":"Bearer "+token}
  const [advanceHistoryData, setAdvanceHistoryData] = useState([])
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
      console.log('here is our advance details', leaveDetails)
      setLeaveInfo([
        {
          title: 'Advance Amount',
          value: leaveDetails[0].amount
        },
        {
          title: 'Repay',
          value: 'Automatically deducted'
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
      if(leaveDetails[0].document!==null){

        setData([{
          document: leaveDetails[0]?.document
        }])
    }
    setReason(leaveDetails[0]?.reason)
    }
    fetchLeave({ url: baseURL + "api/getAdvance?id=" + id }, listLeave)
    axios.get(baseURL+"api/getAdvanceHistory?employee_id="+employee_id, { headers }).then((response)=>{
      response.data.forEach((data)=>{
data.status_date=data.status_date?.split(" ")[0].split("-").reverse().join("-")
      })
      setAdvanceHistoryData(response.data)
    })
  }, [])
  console.log(data)
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']

  

  const historyTableHeadings = [
    {heading:'Amount'},
      {heading:'Request Date'},
      {heading:'Status'},
      {heading:'Status date'},
  ]
  const historyTableKeys = ['amount' , 'date','status','status_date']
  return (
    <React.Fragment>
      <Heading heading={'Advance Approvals'} />
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Advance Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Reasons & Remarks</h5>
          <div style={{marginTop:'10px',color:'var(--bg)',fontWeight:'500'}}>
           {reason}
          </div>
        </div>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Status</h5>
          <div style={{marginTop:'10px',color:'var(--bg)',fontWeight:'500'}}>
           {status}
          </div>
        </div>
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <h3 className='uni_heading'>Advance History</h3>
      <MainTable headings={historyTableHeadings} keys={historyTableKeys} data={advanceHistoryData} height={true} />
      <button className={classes.bottom_btn} onClick={()=>navigate(-1)}>Back</button>
    </React.Fragment>
  )
}

export default AdvanceDetails 