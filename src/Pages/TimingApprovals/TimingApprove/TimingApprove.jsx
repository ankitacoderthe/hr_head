import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import axios from 'axios'

import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import { ToastContainer, toast } from 'react-toastify'
import { baseURL } from '../../../util'
const TimingApprove = () => {
  const cookies = new Cookies()
  const token = cookies.get('hr_head_token')
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [timingData, setTimingData] = useState([])
  const { sendRequest: fetchEmployee } = useHttp()
  const { employee_id, attendance_id } = useParams()
  const [employee_data, setEmployeeData] = useState([])
  // const employee_data = [{
  //     "title": "Electrician",
  //     "value": "Royall"
  // }, {
  //     "title": "Construction Manager",
  //     "value": "Sayer"
  // }, {
  //     "title": "Electrician",
  //     "value": "Aliza"
  // }, {
  //     "title": "Engineer",
  //     "value": "Jemie"
  // }, {
  //     "title": "Subcontractor",
  //     "value": "Jacklin"
  // }, {
  //     "title": "Subcontractor",
  //     "value": "Garold"
  // }, {
  //     "title": "Engineer",
  //     "value": "Dorry"
  // }, {
  //     "title": "Construction Expeditor",
  //     "value": "Matias"
  // }, {
  //     "title": "Subcontractor",
  //     "value": "Genevieve"
  // }, {
  //     "title": "Construction Foreman",
  //     "value": "Catlin"
  // }]

  const tableHeadings = [
    { heading: 'Document Name' }
  ]
  const tableKeys = ['document']
  useEffect(() => {
    // if(token===null){
    // navigate('/login')
    // }
    const headers = { "Authorization": "Bearer " + token }
    const listEmployee = (employeeData) => {
      setEmployeeData([{
        title: "Name",
        value: employeeData.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeData.headEmployeesResult[0].head_employee_name
      }, {
        title: 'Designation',
        value: employeeData.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeData.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeData.employeesResult[0].gender

      }, {
        title: 'location name',
        value: employeeData.employeesResult[0].location_name
      }, {
        title: 'location Department',
        value: employeeData.employeesResult[0].store_department_name
      }])
      setEmpId(employeeData.employeesResult[0].empID)

    }
    fetchEmployee({ url: baseURL + "api/getEmployeeDetails?id=" + employee_id }, listEmployee)
    axios.get(baseURL + "api/getAttendanceCorrectionDatabyAttendanceID?attendance_id=" + attendance_id, { headers }).then((response) => {

      setData(response.data)
      setTimingData([{
        title: ' Date Time',
        value: response.data[0].date_time.split(' ')[0].split("-").reverse().join("-") + " " + response.data[0].date_time.split(' ')[1].substring(0, 8)
      },
      {
        title: 'Reason',
        value: response.data[0].reason
      }])
    })
  }, [])
  function approve(e) {
    e.preventDefault()
    let formData = {
      "status": "Present",
      "date_time": timingData[0].value.split(' ')[0].split("-").reverse().join("-") + " 10:00:00",
      "no_of_shifts": 1,
      "approval_status": "Approved"
    }
    
    // if(token===null){
    // navigate('/login')
    // }
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/updateAttendance/" + attendance_id, { ...formData }, { headers }).then((response) => {
      if (response) {
        toast.success('Timming Approved!')
        setTimeout(() => {
            navigate(-1)
        }, 1000);
      }
    })


  }
  function cancel(e) {
    e.preventDefault()

    const headers = { "Authorization": "Bearer " + token }
    axios.patch(baseURL + "api/rejectAttendance/" + attendance_id, { "approval_status": "Rejected" }, { headers }).then((response) => {
      if (response) {
        toast.error('Rejected!')
          setTimeout(() => {
              navigate(-1)
          }, 1000);
      }
    })


  }
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Heading heading={'Timing Approval'} />
      <DetailsDivContainer data={employee_data} />
      <br />
      <h3 className='uni_heading'>Details</h3>
      <AdditionalInfoContainer data={timingData} />
      {/* <ExtraDetails heading='Timing Details'  data={expenseData} employee_id={employee_id} /> */}

      <MainTable headings={tableHeadings} keys={tableKeys} data={data} height={true} />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve Attendence'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default TimingApprove