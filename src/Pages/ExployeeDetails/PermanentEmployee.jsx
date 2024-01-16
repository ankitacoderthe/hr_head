import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
// Data for Table
import axios from 'axios'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import { useNavigate } from 'react-router-dom'
import { url } from '../../util'
const PermanentEmployee = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
 
  const [Data, setData] = useState([])
  const [date, setDate] = useState()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)

  const [totalEmpGrantedNum, setTotalEmpGrantedNum] = useState(0)
  const [totalPending, setTotalPending] = useState(0)
  const [totalPendingNum, setTotalPendingNum] = useState(0)



  const [totalOuts, setTotalOuts] = useState(0)
  // Here is our data for tile in the page
  const { sendRequest: fetchEmployees } = useHttp()

  const [TileData, setTileData] = useState([])
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  const fetchData=()=>{
    let getString = url + "api/getEmployees?&limit=" + limit + "&offset=" + offset+"&type='Permanent'"
    const listEmployees = (Employees) => {
      setData(Employees)
    }
    fetchEmployees({ url: getString }, listEmployees)
    getString = url + "api/getEmployees?type='Permanent'"
    const listTotal = (Employees) => {
      setTotal(Employees.length)
    }
    fetchEmployees({ url: getString }, listTotal)
  }
  useEffect(() => {
    fetchData()
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date)
    // const listEmployees = (Employees) => {
    //   setData(Employees)
    // }
    // fetchEmployees({url:url+"api/getEmployees?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset},listEmployees)
    axios.get(url + "api/getTotalEmployees", { headers }).then((response) => {

      axios.get(url + "api/getTotalEmployees?type='Trial'", { headers }).then((responseOne) => {
        axios.get(url + "api/getTotalEmployees?type='Permanent'", { headers }).then((responseTwo) => {
          let from_date_out = moment()
          axios.get(url+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseThird) => {
            setTileData([
              {
                title: 'Total Employee',
                value: response.data[0].count_id,
                link:"/employee_details"
              },
              {
                title: 'Trial Employee',
                value: responseOne.data[0].count_id,
                link:"/employee_details/trial_employee"
              },
              {
                title: 'Total Permanent.',
                value: responseTwo.data[0].count_id,
                link:"/employee_details/permanent_employee"
              },
              {
                title: 'Out From location',
                value: responseThird.data[0].count_id,
                link:"/all_attendence/total-outs"
              }
            ])
          })
        })
      })
    })
  },[])

  useEffect(() => {
    let getString = url + "api/getEmployees?&limit=" + limit + "&offset=" + offset+"&type='Permanent'"
    if (employeeFilter.location_name != '') {
      getString +="&location_name=" + employeeFilter.location_name

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

      if (date?.length>1){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1])
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      else if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      const listEmployees = (Employees) => {
        setData(Employees)
      }
      fetchEmployees({ url: getString }, listEmployees)
      getString = url + "api/getEmployees?type='Permanent'"
      if (employeeFilter.location_name != '') {
        getString +="&location_name=" + employeeFilter.location_name
  
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

      if (date?.length>1){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1])
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      else if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      const listTotal = (Employees) => {
        setTotal(Employees.length)
      }
      fetchEmployees({ url: getString }, listTotal)
    
   
    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])

  const changeDate = (data) => {

    setDate(data)
  }
  // Table Headings, Data and Keys

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
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    // { heading: 'Floor' },
    { heading: 'Designation' },
    { heading: 'Department' },
    { heading: 'location' },
    { heading: 'Type' }
  ]

  const tableKeys = [
    'name', 'empID', 'role_name', 'department_name', 'location_name','type'
  ]
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

  return (
    <React.Fragment>
      <Heading heading={'Employee Details'} />
      <TileContainer Data={TileData} />
      <DropDownFilter Btn={'Add Employee'} Lnk={'/add_employee'} title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={Data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <div className='whole_table_c'>
      <MainTable data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk2={true} link1={'/employee_profile'} wd={'1200px'} />
      </div>
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
      <button className='bottom_btn' onClick={()=>navigate(-1)}>Back</button>
    </React.Fragment>
  )

}

export default PermanentEmployee