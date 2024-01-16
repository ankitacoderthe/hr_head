import React, { useState, useEffect } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './OverallSalaryDetails.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import { url } from '../../../util'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'
import GroupTable from '../../../Components/GroupTable/GroupTable'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import FullCalendar from '../../../Components/FullCalender/FullCal'
import FullCal from '../../../Components/FullCalender/FullCal'
import OSD_Charts from './OSD_Charts'
import IncrementModal from "../../../Components/AllModals/IncrementModal"
import 'chartjs-adapter-date-fns'
import { enUS } from 'date-fns/locale'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment-timezone'
import axios from 'axios'

import ReactApexChart from 'react-apexcharts';
import Donutchart from '../../Report/Charts/Donutchart/Donutchart'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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


const OverallSalaryDetails = () => {
  const [date,setDate]=useState(null)
  const { sendRequest: fetchSalary } = useHttp()
  const [month, setMonth] = useState(null)
  const [newDate, setNewDate] = useState(new Date())
  const [year, setYear] = useState(null)
  const cookies = new Cookies();
  const token = cookies.get('hr_head_token')
  const headers = { "Authorization": "Bearer " + token }
  const [div_data, setDivData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchAttendance } = useHttp()
  const { sendRequest: fetchFine } = useHttp()
  const { sendRequest: fetchSalarySummary } = useHttp()
  const [ArrData, setArrData] = useState([])
  const navigate = useNavigate()
  const [attendanceData, setAttendanceData] = useState([])
  const [summaryData, setSummaryData] = useState([])
  const [no_of_working, setNOOfWorking] = useState([])
  const [off, setOff] = useState(0)
  const [totalFine, setTotalFine] = useState(0)
  const [emp_id, setEmpID] = useState(null)
  const [salary, setSalary] = useState([])
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})
  const [totalLateFine, setTotalLateFine] = useState(0)
  const { id } = useParams()
  const [employee_details, setEmployeeDetails] = useState([])
  const [employee_id,setEmployeeId]=useState(null)
  const [percentAtten,setPecentAtten]=useState(0)
  const [options,setOptions]=useState(null)
  const [commissionSum,setCommissionSum]=useState(null)
  const [commissionData,setCommissionData]=useState(   {labels: [],
    datasets: [
      {
        label: 'Commission Amount',
        data: [],
        fill: true, // Fill the area under the line
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Area color
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
      },
    ],
  }
  )
  const [series,setSeries]=useState(0)
  const changeModalState = ([val, element]) => {

    setNewVal(val)
    setObj(element)
  }
  const fetchData=()=>{
    const getTotalLateFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalLateFine(fineDetails[0].amount)
      }
    }
    const listEmployeeDetails = (employeeDetails) => {
      setEmployeeDetails(employeeDetails.employeesResult[0])
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
    const dayArray = ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const listSalary = (Salary) => {
      setSalary(Salary)
      fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + Salary[0].emp_id }, listEmployeeDetails)
      setEmpID(Salary[0].emp_id)
      setEmployeeId(Salary[0].employee_id)
      setMonth(Salary[0].month)
      setYear(Salary[0].year)
      let from_date = moment([Salary[0].year,Salary[0].month]).startOf('month')
      let end_date = moment([Salary[0].year,Salary[0].month]).startOf('month')
      axios.get(url + "api/getCommissionData?employee_id=" + Salary[0].employee_id + "&date=" + moment(from_date).format("YYYY-MM-DD"), { headers }).then((response) => {
        var days = []
        var dataArray=[]
        let sum=0
       response.data.forEach((data)=>{
sum+data.commission
       })
      setCommissionSum(sum)
          for (let i=0;i<7;i++){
let index=response.data.findIndex((data)=>{
  return data.date===moment(from_date).add(i,'d').format("YYYY-MM-DD")
})

days.push(moment(from_date).add(i,'d').format("YYYY-MM-DD"))
            if(index!=-1){
              dataArray.push(response.data[index].commission)
            }else{
              dataArray.push(0)
            }
          }
          console.log(days,dataArray)
         setCommissionData( {
            labels: days,
            datasets: [
              {
                label: 'Commission Amount',
                data: dataArray,
                fill: true, // Fill the area under the line
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Area color
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
              },
            ],
          })
         setOptions( {
          scales: {
            x: {
              type: 'time',
              adapters: { 
                date: {
                  locale: enUS, 
                },
              }, 
              title: {
                display: true,
                text: 'Date',
              },
            },
           
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Commission Amount',
              },
            },
          },
          })

        // setCommissionData({
        //   seriesSpark3: [{
        //     data: array
           
        //   }],

        //   optionsSpark3: {
        //     chart: {
        //         type: 'area',
        //         sparkline: {
        //             enabled: true
        //         },
        //     },
        //     stroke: {
        //         curve: 'straight'
        //     },
        //     fill: {
        //         opacity: 0.3
        //     },
        //     xaxis: {
        //        type:'datetime'
        //     },
        //     yaxis: {
        //         min: 0
        //     },

        // }
        // })
      })
      const listSalarySummary = (Summary) => {
        Summary.forEach((data) => {

          data.date = data.check_in_datetime.split(" ")[0].split("-").reverse().join("-")
          data.time = data.check_in_datetime.split(" ")[1].substring(0, 8)
          data.day = dayArray[moment(data.check_in_datetime).day()]
          data.commission = 0
        })

        setSummaryData(Summary)

      }
      
      if (emp_id !== null) {

        fetchSalarySummary({ url: url + "api/getSalarySummary?employee_id=" + emp_id + "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") }, listSalarySummary)
      }
    }
    fetchSalary({ url: url + "api/getSalary?id=" + id }, listSalary)

   
   

  }
  useEffect(() => {
    let from_date = moment(date).startOf('week')
    let end_date = moment(date).endOf('week')
    axios.get(url + "api/getCommissionData?employee_id=" + employee_id + "&date=" + moment(from_date).format("YYYY-MM-DD"), { headers }).then((response) => {
      var days = []
      var dataArray=[]
   
        for (let i=0;i< 7;i++){
let index=response.data.findIndex((data)=>{
return data.date===moment(from_date).add(i,'d').format("YYYY-MM-DD")
})

days.push(moment(from_date).add(i,'d').format("YYYY-MM-DD"))
          if(index!=-1){
            dataArray.push(response.data[index].commission)
          }else{
            dataArray.push(0)
          }
        }
        console.log(days,dataArray)
       setCommissionData( {
          labels: days,
          datasets: [
            {
              label: 'Commission Amount',
              data: dataArray,
              fill: true, // Fill the area under the line
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Area color
              borderColor: 'rgba(75, 192, 192, 1)', // Line color
            },
          ],
        })
       setOptions( {
        scales: {
          x: {
            type: 'time',
            adapters: { 
              date: {
                locale: enUS, 
              },
            }, 
            title: {
              display: true,
              text: 'Date',
            },
          },
         
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Commission Amount',
            },
          },
        },
        })

     
     
    })
  }, [date])
  
  useEffect(() => {

    setArrData(attendanceData.map((element, index) => {
      return {
        title: element.status,
        date: element.datetime,
        backgroundColor: element.status
      }
    }))
  }, [attendanceData])
  useEffect(() => {

    const dayArray = ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

   
    
    if (emp_id !== null& month!==null&year!=null) {
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
      const listSalarySummary = (Summary) => {
        Summary.forEach((data) => {
  
          data.date = data.check_in_datetime.split(" ")[0].split("-").reverse().join("-")
          data.time = data.check_in_datetime.split(" ")[1].substring(0, 8)
          data.day = dayArray[moment(data.check_in_datetime).day()]
          data.commission = 0
        })
  
        setSummaryData(Summary)
  
      }
     let from_date = moment([year,month]).startOf('month')
     let end_date = moment([year,month]).endOf('month')
      fetchSalarySummary({ url: url + "api/getSalarySummary?employee_id=" + emp_id + "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") }, listSalarySummary)
      const listAttendance = (attendance) => {
        setAttendanceData(attendance)
       
      }
      
      fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
      const listWorkingdays = (attendance) => {
        setNOOfWorking(attendance.length)
        let no_of_days=from_date.daysInMonth()
        setPecentAtten(attendance.length/no_of_days)
      }
      
      fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Present'" }, listWorkingdays)
      const listAbsent = (attendance) => {
        setOff(attendance.length)
      }
     
      fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)
  
  
     
      fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, getTotalFine)
      from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" +id +"&reason="+"'Late Coming'" }, getTotalLateFine)
      
    }



  }, [emp_id,month,year])
  useEffect(() => {
   fetchData()
  }, [])
  console.log(summaryData)
  const getDate = (date) => {
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
    var end_date = moment(date).endOf('month').add(1, 'd')
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
    const listWorkingdays = (attendance) => {
      setNOOfWorking(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1, 'd')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Present'" }, listWorkingdays)
    const listAbsent = (attendance) => {
      setOff(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1, 'd')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1, 'd')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, getTotalFine)
    from_date = moment(datetime).startOf('month')
    end_date = moment(datetime).endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" +id +"&reason="+"'Late Coming'" }, getTotalLateFine)
  
  }
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
      p: 'Total Off',
      h1: off,
      bg: '#80A4FF'
    },
  ]

  const selectMonthFunc = (data) => {
    let year = new Date().getFullYear()
    var from_date = moment([year, data - 1])
    var to_date = moment([year, data])
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
  }
  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Commission' },
    { heading: 'Total Fines' },
    {heading:'Status'}
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_shifts', 'commission', 'amount','status']

  

  const yearHandler = (e) => {
    setYear(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  const monthHandler = (e) => {
    setMonth(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  function download() {

    navigate("/download/" + id)


  }
  function pay() {
    let year = new Date().getFullYear()
    let month = salary[0].month
    axios.patch(url + "api/paySalary/" + id, {
      from_date: moment.tz([year, month], "Asia/Calcutta").startOf('month'),
      to_date: moment.tz([year, month + 1], "Asia/Calcutta").startOf('month'),
      employee_id: salary[0].emp_id
    }, { headers }).then((response) => {
      if (response) {

        navigate(-1)
      }
    })
  }
  function cancel(event){
    event.preventDefault();
navigate(-1)
}

  function callModal() {
    changeModalState([true, employee_details])
  }
console.log(commissionData);
  return (
    <React.Fragment>
      <Heading heading={'Salary Details'} BtnFunc={callModal} BtnFuncName={'Increment'}  />
      {/* <button className={classes.salary_history_btn} onClick={() => changeModalState([true, employee_details])}>Increment</button> */}
      <IncrementModal value={newval} setval={setNewVal} Obj={obj} func={fetchData} ></IncrementModal>
      <DetailsDivContainer data={div_data} />
      <br /><br />
      <div className={classes.calender_container}>
        <div className={classes.actual_calender}>
          {/* <div className={classes.select_date_con}>
           <LabeledInput type='date' id='select_date' title='Select Date' img={false} func2={selectMonthFunc} />
          </div> */}
          <br />
         { <FullCal dateFunc={getDate} event={ArrData} month={month}  year={year}/>}
        </div>
      </div>
      <CalendarBottomDiv  id={emp_id} month={month} data={calData} year={year} empID={employee_id}  />
      <div className={classes.container}>
      <div className={classes.container3}>
          <div className={classes.circle_div1}>
            % of Attendence
            <select id='gMonth1' onChange={(e)=>setMonth(e.target.value)}>
              <option value=''>--Select Month--</option>
              <option selected={month===0} value='0'>Janaury</option>
              <option selected={month===1} value='1'>February</option>
              <option selected={month===2}value='2'>March</option>
              <option selected={month===3} value='3'>April</option>
              <option selected={month===4} value='4'>May</option>
              <option selected={month===5} value='5'>June</option>
              <option selected={month===6} value='6'>July</option>
              <option selected={month===7} value='7'>August</option>
              <option selected={month===8} value='8'>September</option>
              <option selected={month===9} value='9'>October</option>
              <option selected={month===10} value='10'>November</option>
              <option  selected={month===11} value='11'>December</option>
            </select>
          </div>
          <div className={classes.circle_div2}><Donutchart series={Math.round((percentAtten*100).toFixed(2))}/></div>
          <div className={classes.circle_div3}>
            <div className={classes.circle_div3_div}>
              <span>{series!==undefined?(series*100).toFixed(2):0}%</span>
              <div className={`${classes.circle_div3_inner_div}`}>
                <div className={`${classes.colored}`}></div> Present
              </div>
            </div>
            <div className={classes.circle_div3_div}>
              <span>{series!=undefined?(100-(series*100)).toFixed(2):100}%</span>
              <div className={classes.circle_div3_inner_div}>
                <div></div> Present
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container4}>
          <div className={classes.con4_heading}>
            Overall Performance : <span>Commission</span>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
         
          <div className={classes.container5}>
          <Line data={commissionData} options={options} />
        
    </div>
        </div>
    </div>
      <br />
      <h3 className='uni_heading'>Salary History</h3>
      {/* <DropDownFilter title1={'Floor'} title2={'Location'} /> */}
      <MainTable headings={tableHeadings} keys={tableKeys} data={summaryData} height={true} />
      <button className={classes.salary_history_btn} onClick={download}>Salary Summary</button>
      <br />
      <GroupTable salary={salary} />
      <br /> <br />
      {
        salary[0]?.salary_status === 'Pending' ?
          <BottomButtonContainer approve={'Pay Salary'}  func={true} noCancel={true} func2={pay} /> :    <button className='bottom_btn' onClick={()=>navigate(-1)}>Back</button>
      }




    </React.Fragment>
  )
}

export default OverallSalaryDetails