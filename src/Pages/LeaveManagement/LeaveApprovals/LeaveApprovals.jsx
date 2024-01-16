import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './LeaveApprovals.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { baseURL } from '../../../util'
const LeaveApprovals = () => {
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
      setFromDate(leaveDetails[0].from_date)
      setToDate(leaveDetails[0].to_date)
      let from_date = leaveDetails[0].from_date
      let to_date = leaveDetails[0].to_date
      let from_day = moment(from_date).date()
      let from_month = moment(from_date).month()
      let year = moment(from_date).year()
      let to_day = moment(to_date).date()
      let to_month = moment(to_date).month()
      let from = moment(from_date)
      let to = moment(to_date).add(1, 'd')
      let monthArray = ["January, February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      setLeaveInfo([
        {
          title: 'Date',
          value: monthArray[from_month - 1] + " " + from_day + " " + " to " + monthArray[to_month - 1] + " " + to_day + " " + " ," + year
        },
        {
          title: 'Days',
          value: to.diff(from, 'd')
        },
        {
          title: 'Recall Head',
          value: leaveDetails[0].recall_head === 1 ? 'Yes' : 'No'
        },
        {
          title: 'Head Approval',
          value: leaveDetails[0].head_approval === 1 ? 'Yes' : 'No'
        }
      ])
      if (leaveDetails[0].document !== null) {

        setData([{
          document: leaveDetails[0]?.document
        }])
      }
    }
    fetchLeave({ url: baseURL + "api/getLeave?id=" + id }, listLeave)
  }, [])

  // console.log(data)


  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']
  function approve(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLeaveStatus", {

      "status": "Approved",
      "from_date": from_date.split(" ")[0],
      "to_date": to_date.split(" ")[0],
      "employee_id": employee_id

    }, { headers }).then((response) => {
      if (response.status === 200) {
        toast.success('Approved Successfully!')
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      }
    })

  }
  function cancel(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateLeaveStatus", {

      "status": "Rejected",
      "from_date": from_date.split(" ")[0],
      "to_date": to_date.split(" ")[0],
      "employee_id": employee_id,
      "reason": reason

    }, { headers }).then((response) => {
      if (response) {
        toast.error('Leave Declined!')
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      }
    })


  }
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Heading heading={'Leave Approvals'} />
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Leave Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} func2={setReason} />
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default LeaveApprovals 