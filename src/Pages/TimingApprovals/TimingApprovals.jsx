import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'

import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'

// Data for Table

import MainTable from '../../Components/MainTable/MainTable'
import { baseURL } from '../../util'

const tableHeadings=[
  {heading:'Employee Name'},
  {heading:'Employee ID'},
  {heading:'Attendence'},
  {heading:'Floor'},
  {heading:'Location'},
  {heading:'Status'},
]

const tableKeys = [
  'employee_name', 'empID', 'status', 'floor_name','location_name','status'
]



const TimingApprovals = () => {
  // Here is our data for tile in the page
  const [date, setDate] = useState([])
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total,setTotal]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  useEffect(() => {
  const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    let    from_date = moment()
    axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
      const todayPresent = response.data[0]?.count_id
      from_date = moment().subtract(1, 'd')
      axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
        const yesterdayPresent = response.data[0]?.count_id
        from_date = moment()
        axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
          const todayAbsent = response.data[0]?.count_id
          from_date = moment().subtract(1, 'd')
          axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
            const yesterdayAbsent = response.data[0]?.count_id
            from_date = moment()
            axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
              const todayLeave = response.data[0]?.count_id
              from_date = moment().subtract(1, 'd')
              axios.get(baseURL+"api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
                const yesterdayLeave = response.data[0]?.count_id
                let from_date_out = moment()
                axios.get(baseURL+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {
                  let totalOut = response.data[0]?.count_id
                  setTileData([{
                    title: "Total Present",
                    value: todayPresent,
                    num: todayPresent - yesterdayPresent,
                    para: "Day"
                  }, {
                    title: "Total Absent",
                    value: todayAbsent,
                    num: todayAbsent - yesterdayAbsent,
                    para: "Day"
                  }, {
                    title: "Total On Leave",
                    value: todayLeave,
                    num: todayLeave - yesterdayLeave,
                    para: "Day"
                  }, {
                    title: "Total Outs",
                    value: totalOut,
                    para: "Hour"
                  }])
                })
              })
            })
          })
        })
      })
    })
    console.log(TileData)
  },[])
  useEffect(() => {
    

    let getString = baseURL + "api/getAttendanceCorrectionRequests?" + "&limit=" + limit + "&offset=" + offset + "&type='Out For Some Work'"
     if (date?.length>1){
          let from_date=moment(date[0].toDate())
          
          let to_date=moment(date[date.length-1].toDate()).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0].toDate())
          
          let to_date=moment(date[date.length-1].toDate()).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    if (employeeFilter.employee_query != ''&&employeeFilter.employee_query!==undefined) {
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
    

    getString = baseURL + "api/getAttendanceCorrectionRequests?"   + "&type='Out For Some Work'"
     if (date?.length>1){
          let from_date=moment(date[0].toDate())
          
          let to_date=moment(date[date.length-1].toDate()).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0].toDate())
          
          let to_date=moment(date[date.length-1].toDate()).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    if (employeeFilter.employee_query != ''&&employeeFilter.employee_query!==undefined) {
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

   
  }, [date, limit, offset, employeeFilter])
  // Table Headings, Data and Keys
  const changeByEmployee = (data) => {
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


  return (
    <React.Fragment>
      <Heading heading={'Timing Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable data={data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/timing_approve'} link2={false} App_Btn={false} link4={false}   />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}

export default TimingApprovals