import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DragAndDrop from '../../../Components/DragAndDrop/DragAndDrop'
import Heading from '../../../Components/Heading/Heading'
import LabeledInputContainer from '../../../Components/LabeledInputContainer/LabeledInputContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AttendenceApproval.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import axios from 'axios'
import moment from 'moment'
import {toast,ToastContainer} from 'react-toastify'
import Cookies from 'universal-cookie'
import { baseURL } from '../../../util'
const AttendenceApproval = () => {
  const cookies = new Cookies()
  const token = cookies.get('hr_head_token')
const [id,setId]=useState(null)
  const [inputVals, setValhandler] = useState({
    time: '',
    date: ''
  })
const navigate=useNavigate()
  const [date,setDate]=useState('')
  
const [attendanceID,setAttendanceID]=useState('')

const [time,setTime]=useState('')
const [employee_data,setEmployeeData]=useState([])
const {employee_id,attendance_id}=useParams()
const[empId,setEmpId]=useState(null)
const { sendRequest: fetchEmployee } = useHttp()
useEffect(()=>{

  // if(token===null){
  // navigate('/login')
  // }
  const headers={"Authorization":"Bearer "+token}
  const listEmployee = (employeeData) => {
    setEmployeeData([{
      title:"Name",
      value:employeeData.employeesResult[0].name
    },{
title:'SuperVisor Name',
value:employeeData.headEmployeesResult[0].head_employee_name
    },{
      title:'Designation',
value:employeeData.employeesResult[0].role_name
    },{
      title:'Floor Name',
value:employeeData.employeesResult[0].floor_name

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
      let from_date = moment(response.data[0].date_time.split(" ")[0])
      setId(response.data[0].attendance_request_id)
      setDate(response.data[0].date_time.split(" ")[0])

      setAttendanceID(response.data[0].attendance_id)
    })



  }, [])
  const [formData,setFormData]=useState({"download":null,
"status":"Present",
"date_time":null,
"no_of_shifts":1,
"approval_status":"Approved",
"attendance_id":attendance_id,
"employee_id":employee_id,
"reason":"By Mistake"})
  function uploadFile(photo) {
    if (photo.length > 0) {

      axios({
        method: 'get',
        url: photo[0].preview,
        responseType: 'blob'
      }).then(function (response) {
        var reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          setFormData((prevState) => {
            return {
              ...prevState, download: base64data
            }
          })
        }

      })
    }



}
function cancelRequests(e){
  e.preventDefault()
  const headers={"Authorization":"Bearer "+token}
  axios.patch(baseURL+"api/rejectAttendance/"+id,{"approval_status":"Rejected","attendance_id":attendance_id},{headers}).then((response)=>{
    if(response.status===200){
      toast.success("Successfully Rejected")
      setTimeout(()=>{
        navigate(-1)
      },1000)
    }
  })
  
  
}
async function approveRequests(e){
  e.preventDefault()
  //   const dateSet=date
  // const dateTime=dateSet+" "+time
  // setDate(dateTime)
  const url="http://localhost:9000/" 
 
  const headers={"Authorization":"Bearer "+token}
  axios.patch(baseURL+"api/updateAttendance/"+id,{...formData},{headers}).then((response)=>{
    if(response.status===200){
      toast.success("Successfully Approved")
      setTimeout(()=>{
        navigate(-1)
      },1000)
    }
  })
   
  
  }
function InputValHanlder(e){
  let  time=e
console.log(time)
  setFormData((prevState)=>{
    return{
      ...prevState,date_time:date+" "+time
    }
  }) 
}
console.log(date)
  return (
    <React.Fragment>
      <Heading heading={'Attendence Approval'} />
      <ToastContainer></ToastContainer>
      <DetailsDivContainer data={employee_data} />
      <DragAndDrop uploadFile={uploadFile} />
      <LabeledInputContainer date={date}  func={InputValHanlder} />
      <BottomButtonContainer func={true} cancel={'Reject'} approve={'Approve Attendence'}  cancelRequests={cancelRequests} func2={approveRequests} />
    </React.Fragment>
  )
}

export default AttendenceApproval