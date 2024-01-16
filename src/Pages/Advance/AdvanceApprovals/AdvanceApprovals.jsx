import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import {toast,ToastContainer} from 'react-toastify'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from '../../../util'
const AdvanceApprovals = () => {
  const cookies = new Cookies();
  
  const navigate = useNavigate()
  const token = cookies.get('hr_head_token')
  const headers={"Authorization":"Bearer "+token}
  const [data, setData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchLeave } = useHttp()
  const { id, employee_id } = useParams()
  const [div_data, setDivData] = useState([])
  const [leave_info, setLeaveInfo] = useState(null)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [reason, setReason] = useState(null)
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
    }
    fetchLeave({ url: baseURL + "api/getAdvance?id=" + id }, listLeave)
    axios.get(baseURL+"api/getAdvanceHistory?employee_id="+employee_id, { headers }).then((response)=>{
      response.data.forEach((data)=>{
data.status_date=data.status_date?.split(" ")[0].split("-").reverse().join("-")
      })
      setAdvanceHistoryData(response.data)
    })
  }, [])
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']

  
  function approve(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateAdvanceStatus/" + id, {

      "status": "Approved",
      "rejection_reason": null

    }, { headers }).then((response) => {
      if (response) {
        toast.success('Advance Approved!')
                setTimeout(() => {
                    navigate(-1)
                }, 1000);
      }
    })

  }
  function cancel(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateAdvanceStatus/" + id, {

      "status": "Rejected",
      "rejection_reason": reason

    }, { headers }).then((response) => {
      if (response) {
        toast.error('Advance Approval Rejected!')
        setTimeout(() => {
            navigate(-1)
        }, 1000);
      }
    })


  }
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
      <ToastContainer></ToastContainer>
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Advance Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} func2={setReason} />
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <h3 className='uni_heading'>Advance History</h3>
      <MainTable headings={historyTableHeadings} keys={historyTableKeys} data={advanceHistoryData} height={true} />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default AdvanceApprovals 