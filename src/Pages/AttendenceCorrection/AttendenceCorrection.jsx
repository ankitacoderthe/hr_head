import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import { ToastContainer,toast } from 'react-toastify'
import ExpenseSearchBar from '../../Components/ExpenseSearchBar/ExpenseSearchBar'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../UI/DetailsDivContainers/DetailsDivContainer'
import axios from 'axios'
import classes from './AttendenceCorrection.module.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../util'
const AttendenceCorrection = () => {
  const url=baseURL
  const navigate=useNavigate()
  const [isLoading,setIsloading]=useState(false)
  const [searchtext, setSearchText] = useState('')
const [check_in_date,setCheckInDate]=useState(null)
const [check_out_date,setCheckOutDate]=useState(null)
const [check_in_time,setCheckInTime]=useState(null)
const [check_out_time,setCheckOutTime]=useState(null)
const cookies=new Cookies()
const [employee_data, setEmployeeData] = useState([])
 const [employee_id,setEmployeeId] =useState(null)
 const [noData, setNoData] = useState(true)
  const searchHandler = (data) => {
    setSearchText(data)
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getEmployeeDetails?employee_query=" + data, { headers }).then((response) => {
      if (response.data.employeesResult!==undefined) {
            setEmployeeId(response.data.employeesResult[0].id)
            setEmployeeData([
                {
                    title: "Name",
                    value: response.data.employeesResult[0].name
                },
                {
                    title: "Employee ID",
                    value: response.data.employeesResult[0].empID
                },
                {
                    title: 'SuperVisor Name',
                    value: response.data.headEmployeesResult[0]?.head_employee_name
                }, {
                    title: 'Designation',
                    value: response.data.employeesResult[0].role_name
                }, , {
                    title: 'Department',
                    value: response.data.employeesResult[0].department_name
                }, {
                    title: 'Floor Name',
                    value: response.data.employeesResult[0].floor_name

                }, {
                    title: 'Gender',
                    value: response.data.employeesResult[0].gender

                }, {
                    title: 'location name',
                    value: response.data.employeesResult[0].location_name
                }, {
                    title: 'location Department',
                    value: response.data.employeesResult[0].store_department_name
                }
            ])
            setNoData(false)
        }
        else {
            setNoData(true)
        }


    })
}
const markPresent=(e)=>{
  e.preventDefault()
  const token = cookies.get('hr_head_token')
  const headers = { "Authorization": "Bearer " + token }
  if(employee_id===null){
    toast.error("employee must be there")
  }
   else{
    setIsloading(true)
   axios.post(url+"api/markPresentManually",{
      check_in_date:check_in_date,
      check_in_time:check_in_time,
      check_out_date:check_out_date,
      check_out_time:check_out_time,
      employee_id:employee_id
    },{headers}).then((response)=>{
      if(response.status===200){
        toast.success("Marked Present")
      setTimeout(()=>{
        navigate(-1)
      },1000)
      }
    })
  }
}
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Heading heading={'Attendence Corrections'} />

      <ExpenseSearchBar func={searchHandler} />
      {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
      <form className='uni_container'onSubmit={markPresent}>
        <div className={classes.inner_container}>
          <LabeledInput required={true} cls={true} func2={setCheckInTime} value={check_in_time} id={'time'} ph={'In Time'} title={'In Time'} img={false} type={'time'} />
          <LabeledInput required={true} cls={true} func2={setCheckOutTime} value={check_out_time} id={'time1'} ph={'Out Time'} title={'Out Time'} img={false} type={'time'} />
          <LabeledInput required={true} cls={true}func2={setCheckInDate} value={check_in_date} id={'date'} ph={'In Date'} title={'In Date'} type={'date'} img={false} />
          <LabeledInput required={true} cls={true} func2={setCheckOutDate} value={check_out_date} id={'date2'} ph={'Out Date'} title={'Out Date'} type={'date'} img={false} />
        </div>
        <BottomButtonContainer cancel={'Cancel'}  disabled={isLoading} approve={'Add Correction'} f1={true} />
      </form>
    </React.Fragment>
  )
}

export default AttendenceCorrection