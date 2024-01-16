import classes from './AllAttendence.module.css'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import { toast, ToastContainer } from 'react-toastify'
import { url } from '../../util'
const AllPresent = () => {
  // Here is our data for tile in the page
  const [date, setDate] = useState([new Date(),new Date()])
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  // let {data,loading,error}=useGetHook(url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'", from_date_format)
  useEffect(() => {
    changeTileData()
   fetchData() 
  }, [])
  const fetchData=()=>{
    let getString = url + "api/getAttendance?" + "&limit=" + limit + "&offset=" + offset+"&status='Present'"
    if (date?.length > 0) {
      let from_date = moment(date[0])
      let to_date = moment(date[date.length - 1]).add(1, 'd')
      getString += "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD")
      const listAttendance = (attendance) => {
        setData(attendance)
      }
      fetchPendingAttendance({ url: getString }, listAttendance)
    }
   getString = url + "api/getAttendance?status='Present'"
   if (date?.length > 0) {
    let from_date = moment(date[0])
    let to_date = moment(date[date.length - 1]).add(1, 'd')
    getString += "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD")


    const listTotal = (attendance) => {
     setTotal(attendance.length)
   }
   fetchPendingAttendance({ url: getString }, listTotal)

  }

  }
  function changeTileData() {
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    // let from_date = moment(date)
    // const listAttendance = (attendance) => {
    //   setData(attendance)
    // }
    // const listTotal = (attendance) => {
    //   // Total length of data
    //   setTotal(attendance.length)
    // }
    // fetchPendingAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset  }, listAttendance)
    // fetchPendingAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")  }, listTotal)
    let from_date = moment()
    axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
      const todayPresent = response.data[0]?.count_id
      from_date = moment().subtract(1, 'd')
      axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
        const yesterdayPresent = response.data[0]?.count_id
        from_date = moment()
        axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
          const todayAbsent = response.data[0]?.count_id
          from_date = moment().subtract(1, 'd')
          axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
            const yesterdayAbsent = response.data[0]?.count_id
            from_date = moment()
            axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
              const todayLeave = response.data[0]?.count_id
              from_date = moment().subtract(1, 'd')
              axios.get(url + "api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
                const yesterdayLeave = response.data[0]?.count_id
                let from_date_out = moment()
                axios.get(url + "api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {
                  let totalOut = response.data[0]?.count_id
                  setTileData([{
                    title: "Total Present",
                    value: todayPresent,
                    num: todayPresent - yesterdayPresent,
                    para: "Day",
                    link:"/all_attendence/present"
                  }, {
                    title: "Total Absent",
                    value: todayAbsent,
                    num: todayAbsent - yesterdayAbsent,
                    para: "Day",
                    link:"/all_attendence/absent"
                  }, {
                    title: "Total On Leave",
                    value: todayLeave,
                    num: todayLeave - yesterdayLeave,
                    para: "Day",
                    link:"/all_attendence/on-leave"
                  }, {
                    title: "Total Outs",
                    value: totalOut,
                    para: "Hour",
                    link:"/all_attendence/total-outs"
                  }])
                })
              })
            })
          })
        })
      })
    })
    console.log(TileData)
  }
  function markPresent() {
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    axios.get('http://49.205.181.193:8081/api/v2/WebAPI/GetDeviceLogs?APIKey=330718082302&FromDate=' + moment().subtract(1, 'd').format("YYYY-MM-DD") + "&ToDate=" + moment().format("YYYY-MM-DD")).then((response) => {
      axios.patch(url + "api/markPresent", response.data, { headers }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          toast.success("Marked Present")
          setTimeout(() => {
            changeTileData()
          }, 1000)
        }
      }).catch((error) => {
        toast.error("Present Already Marked")
      })
    }).catch((error) => {
      console.log(error)
      toast.error("Device Not Present")
    })
  }
  useEffect(() => {
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    let getString = url + "api/getAttendance?" + "&limit=" + limit + "&offset=" + offset+"&status='Present'"
    if (date?.length > 0) {
      let from_date = moment(date[0])
      let to_date = moment(date[date.length - 1]).add(1, 'd')
      getString += "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD")
    }
    if (employeeFilter.employee_query != '' && employeeFilter.employee_query !== undefined) {
      getString += "&employee_query=" + employeeFilter.employee_query
    }
    if (employeeFilter.role_name != '') {
      getString += '&role_name=' + employeeFilter.role_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listAttendance)
    getString = url + "api/getAttendance?status='Present'"
    if (date?.length > 0) {
      let from_date = moment(date[0])
      let to_date = moment(date[date.length - 1]).add(1, 'd')
      getString += "&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD")
    }
    if (employeeFilter.employee_query != '' && employeeFilter.employee_query !== undefined) {
      getString += "&employee_query=" + employeeFilter.employee_query
    }
    if (employeeFilter.role_name != '') {
      getString += '&role_name=' + employeeFilter.role_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }
    const listTotal = (attendance) => {
      setTotal(attendance.length)
    }
    fetchPendingAttendance({ url: getString }, listTotal)
    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }
  const changeDate = (data) => {
    setLimit(10)
    setOffset(0)
    setDate(data)
  }
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    { heading: 'Attendance' },
    // { heading: 'Floor' }
    { heading: "Location" }
  ]
  //  'floor_name'
  const tableKeys = [
    'employee_name', 'empID', 'status', 'location_name'
  ]
  const changeByEmployee = (data) => {
    // if(data.charAt(0)!=='1')
    //  {
    setEmployeeFilter((prevState) => {
      return { ...prevState, employee_query: data }
    })
  }
  const changeByDesignation = (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, role_name: data }
    })
  }
  // if(!loading){
  const selectBylocation = (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, location_name: data }
    })
  }
  const selectByFloor = async (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, floor_name: data }
    })
  }
  return (
    <React.Fragment>
      <Heading heading={'All Present'} />
      <ToastContainer></ToastContainer>
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} date={date} isdate={true} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      {/* <button className={classes.mp_button} onClick={markPresent}>Mark Present</button> */}
      <br />
      <br />
      <MainTable data={data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link2={'/attendence_history'} link1={false} link4={false} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} total={total} offset={offset} limit={limit} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>
// }
// else{
//   <React.Fragment>
//     <h1>error</h1>
//     </React.Fragment>
// }
// }
export default AllPresent