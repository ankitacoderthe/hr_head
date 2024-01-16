import React, { useState, useEffect } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './AttendenceHistory.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import FullCal from '../../../Components/FullCalender/FullCal'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'
import { url } from '../../../util'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import axios from 'axios'
const Tile = ({ date, view }) => {

  const CurrentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
  switch (date.getDay()) {
    case 0:
      return <div className='tile green_tile'>
        <div className='tile_color_div'></div>
        <span>off</span>
      </div>
    case 6:
      return <div className='tile green_tile'>
        <div className='tile_color_div '></div>
        <span>off</span>
      </div>

    default:
      return <div className='tile'>
        <div className='tile_color_div'></div>
        <span>9hr</span>
      </div>
  }
}


const AttendenceHistory = () => {
  const dayArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const cookies = new Cookies();
  const [div_data, setDivData] = useState([])
  const [ArrData , setArrData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchAttendance } = useHttp()
  const { sendRequest: fetchFine } = useHttp()

  const navigate = useNavigate()
  const [attendanceData, setAttendanceData] = useState([])
  const [tableData, setTableData] = useState([])
  const [no_of_working, setNOOfWorking] = useState([])
  const [off, setOff] = useState(0)
  const [totalFine, setTotalFine] = useState(0)
  const [totalLateFine, setTotalLateFine] = useState(0)
  const { datetime,id } = useParams()
  const [commissionSum,setCommissionSum]=useState(0)
  const [month, setMonth] = useState(moment().month())
  const [year, setYear] = useState(moment().year())
  const token = cookies.get('hr_head_token')
  const [emp_id,setEmpId]=useState(null)
    const headers = { "Authorization": "Bearer " + token }

  useEffect(() => {
    const getTotalFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalFine(fineDetails[0].amount)
      }
    }
    const getTotalLateFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalLateFine(fineDetails[0].amount)
      }
    }

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
      setEmpId(employeeDetails.employeesResult[0].empID)
    }
    fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + id }, listEmployeeDetails)
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    let from_date = moment(datetime).startOf('month')
    let end_date = moment(datetime).endOf('month')
   setMonth(from_date.month())
   setYear(from_date.year())
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + id }, listAttendance)
    const listWorkingdays = (attendance) => {
      setNOOfWorking(attendance.length)
    }
    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + id + "&status='Present'" }, listWorkingdays)
    const listAbsent = (attendance) => {
      setOff(attendance.length)
    }
    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)

    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" +id +"&reason="+"'Late Coming'" }, getTotalLateFine)
    
    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + id }, getTotalFine)
    
   
  
  
  }, [])
  useEffect(()=>{
   let from_date = moment(datetime).startOf('month')
   let end_date = moment(datetime).endOf('month')
    axios.get(url + "api/getCommissionData?employee_id=" + emp_id + "&date=" + moment(from_date).format("YYYY-MM-DD"), { headers }).then((response) => {
      var days = []
      var dataArray=[]
      let sum=0
      if(response.data!==''){
        response.data.forEach((data)=>{
          sum+=data.commission
               })
              setCommissionSum(sum)
      }
    
    })
  },[emp_id,datetime])

  console.log(div_data);
  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Attendence' },
    { heading: ' ' },
    { heading: ' ' },
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_shifts', 'status']
  const newData = []
  tableData.forEach((data) => {
    let obj = {}
    obj.date = data.datetime?.split(" ")[0]
    obj.time = data.datetime?.split(" ")[1].substring(0, 8)
    let date = moment(obj.date)
    obj.day = dayArray[date.day()]
    obj.no_of_shifts = data.no_of_shifts
    obj.status = data.status
    newData.push(obj)
  })
  
  const [newDate, setNewDate] = useState(new Date())
 

  const yearHandler = (e) => {
    setYear(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  const decreaseMonthHandler = (e) => {
    setMonth((prevState) => {
      if (prevState !== 0) {
        return prevState - 1
      }
      else {
        return 12

      }

    })
    if (month === 0) {
      setYear((prevState) => {
        return prevState - 1
      })
    }
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }

    let from_date = moment([year, month])
    let to_date = moment([year, month + 1])

    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&employee_id=" + id }, listAttendance)

  }
  console.log("here our data", no_of_working, totalFine, totalFine, off)
  var calData = [
    {
      p: 'No. Of Working',
      h1: no_of_working,
      bg: '#96503F'
    },
    {
      p: 'Total Late Fine',
      h1: totalLateFine,
      bg: '#FFE247'
    },
    {
      p: 'Total Fine',
      h1: totalFine,
      bg: '#8AFF88'
    },
    {
      p: 'Total Commission',
      h1: commissionSum,
      bg: '#C50303'
    },
    {
      p: 'Absent',
      h1: off,
      bg: '#80A4FF'
    },
  ]
useEffect(()=>{

  setArrData( attendanceData.map((element, index) => {
    return {
      title: element.status,
      date: element.datetime,
      backgroundColor: element.status
    }
  }))
},[attendanceData])

  const selectMonthFunc = (data) => {
    let year = new Date().getFullYear()
    var from_date = moment([year, data]).startOf('month')
    var to_date =  moment([year, data]).startOf('month').add(moment([year, data]).daysInMonth(),'d')
    const listAttendance = (attendance) => {
      setTableData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&employee_id=" + id }, listAttendance)
  }

  const getDate = (date) => {
    setMonth(moment(date).month())
    const getTotalFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalFine(fineDetails[0].amount)
      }
    }
    const getTotalLateFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalLateFine(fineDetails[0].amount)
      }
    }
    var from_date = moment(date).startOf('month')
    var end_date = moment(date).endOf('month').add(1,'d')
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + id }, listAttendance)
    const listWorkingdays = (attendance) => {
      setNOOfWorking(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1,'d')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + id + "&status='Present'" }, listWorkingdays)
    const listAbsent = (attendance) => {
      setOff(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1,'d')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)
    from_date = moment(date).startOf('month')
     end_date = moment(date).endOf('month').add(1,'d')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + id }, getTotalFine)
    
    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" +id +"&reason="+"'Late Coming'" }, getTotalLateFine)
  }
console.log("month",month)
  return (
    <React.Fragment>
      <Heading heading={'Attendence History'} />
      <div className={classes.inner_div}>
        {div_data.map((element, index) => (<ExtraDetailsDiv key={index} title={element.title} value={element.value} index={index} />))}
      </div>
      <div className={classes.calender_container}>
        <div className={classes.actual_calender}>
        <FullCal dateFunc={getDate} event={ArrData} month={month}  year={year}/>
        </div>
      </div>
      <CalendarBottomDiv id={id} month={month} data={calData} year={year} empID={emp_id} />
      <br />
      <h3 className='uni_heading'>Attendance History</h3>
      <div className={classes.month_filter}><SelectTag parentFunc={selectMonthFunc} title1={'Select Month'} img={Img} month={month} /></div>
      <MainTable headings={tableHeadings} keys={tableKeys} data={newData} height={true} />
    </React.Fragment>
  )
}

export default AttendenceHistory