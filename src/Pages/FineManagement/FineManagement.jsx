import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import MainTable from '../../Components/MainTable/MainTable'
import AddFineModal from '../../Components/AllModals/AddFineModal'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
import moment from 'moment'
import axios from 'axios'

import Pagination from '../../Components/Pagination/Pagination'
import { url } from '../../util'
// Table Headings, Data and Keys
const tableHeadings = [
  { heading: 'Employee Name' },
  { heading: 'Employee ID' },
  // { heading: 'Floor' },
  { heading: 'Location' },
  { heading: 'Fine Date' },
  { heading: 'Fine' },
  {heading:'Request Status'}

]

const tableKeys = [
  'employee_name', 'empID','location_name', 'date', 'amount','status'
]

const FineManagement = () => {

  const [total,setTotal]=useState(0)
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})
  const [SuperVisor, setSuperVisor] = useState(null)
  
  // Here is our data for tile in the page
  const [date, setDate] = useState(null)
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const token = cookies.get('hr_head_token')
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  function OverAllData() {
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment()
    let getString = url + "api/getFines?limit="+limit+"&offset="+offset
    
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listAttendance)
    getString = url + "api/getFines?"
    const listTotal = (attendance) => {
      setTotal(attendance.length)
    }
    fetchPendingAttendance({ url: getString }, listTotal)
    
    axios.get(url+"api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")+"&status='Pending'&status='Approved'" , { headers }).then((response) => {
      const todayFine = response.data[0]?.amount===null?0:response.data[0]?.amount
      from_date = moment().subtract(1, 'd')
      axios.get(url+"api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") +"&status='Pending'&status='Approved'", { headers }).then((response) => {
        const yesterdayFine = response.data[0]?.amount===null?0:response.data[0]?.amount
        from_date = moment()
        axios.get(url+"api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")+"&status='Approved'" , { headers }).then((response) => {
          const todayFineApproved = response.data[0]?.amount===null?0:response.data[0]?.amount
          from_date = moment().subtract(1, 'd')
          axios.get(url+"api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")+"&status='Approved'" , { headers }).then((response) => {
            const yesterdayFineApproved = response.data[0]?.amount===null?0:response.data[0]?.amount
            from_date = moment()
        axios.get(url+"api/getTotalFinedEmployees?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")+"&status='Pending'&status='Approved'" , { headers }).then((response) => {
          const todayFinedEmployees = response.data[0]?.count_id===null?0:response.data[0]?.count_id
          from_date = moment().subtract(1, 'd')
          axios.get(url+"api/getTotalFinedEmployees?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")+"&status='Pending'&status='Approved'", { headers }).then((response) => {
            const yesterdayFinedEmployees = response.data[0]?.count_id===null?0:response.data[0]?.count_id
            from_date = moment()
            
                let from_date_out = moment()
                axios.get(url+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {
                  let totalOut = response.data[0]?.count_id
                  setTileData([{
                    title: "Total Fine",
                    value: todayFine,
                    num: todayFine - yesterdayFine,
                    para: "Day",
                    link:"/fine_management/total-fines"
                  },{
                    title: "Total Fine Approved",
                    value: todayFineApproved,
                    num: todayFineApproved - yesterdayFineApproved,
                    para: "Day",
                    link:"/fine_management/fines-approved"
                  }, {
                    title: "Total Fined Employees",
                    value: todayFinedEmployees,
                    num: todayFinedEmployees - yesterdayFinedEmployees,
                    para: "Day",
                    link:"/fine_management/total-fines"
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
      
  }
  useEffect(() => {
    OverAllData()
    console.log(TileData)
  }, [])
  useEffect(() => {
    let from_date = moment(date)
//getFine

  let getString = url + "api/getFines?limit="+limit+"&offset="+offset
  if(employeeFilter.location_name!=''){
    getString+="location_name="+employeeFilter.location_name
  }
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
     if (date?.length>1){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listAttendance)
    getString = url + "api/getFines?"
    if(employeeFilter.location_name!=''){
      getString+="location_name="+employeeFilter.location_name
    }
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
     if (date?.length>1){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
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
    
    setDate(data)
  }


  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
    })
    setNewVal(val)
    setObj(element)
  }


  return (
    <React.Fragment>
      <Heading heading={'Fine Management'} Btn_link={'/add_fine'} Btn={'Fine'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk3={true} link1={'/fine_approvals'} link2={'/fine_details'} link4={false} App_Btn={false} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys}/>
      <AddFineModal value={newval} setval={setNewVal} Obj={obj} SuperVisor={SuperVisor} reloadFunc={OverAllData} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>


export default FineManagement