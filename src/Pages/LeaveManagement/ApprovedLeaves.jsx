import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import MainTable from '../../Components/MainTable/MainTable'
import AddLeaveModal from '../../Components/AllModals/AddLeaveModal'
import { url } from '../../util'
const ApprovedLeaves = () => {
 
  // Here is our data for tile in the page
  const [date, setDate] = useState([new Date(),new Date()])

  const cookies = new Cookies();
  const token = cookies.get('hr_head_token')
  const [SuperVisor, setSuperVisor] = useState(null)
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

  const { sendRequest: fetchLeaves } = useHttp()

  const [TileData, setTileData] = useState([])
  // Here is our data for tile in the page'
  const fetchData=()=>{
    let getString = url + "api/getLeaves?&limit="+limit+"&offset="+offset
    if (date?.length>0){
      let from_date=moment(date[0])
      
      let to_date=moment(date[date.length-1])
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    const listLeave = (leave) => {
      setData(leave)
    }
    fetchLeaves({ url: getString }, listLeave)
    
    getString = url + "api/getLeaves?"
    if (date?.length>0){
      let from_date=moment(date[0])
      
      let to_date=moment(date[date.length-1])
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    const listTotal = (leave) => {
      setTotal(leave.length)
    }
    fetchLeaves({ url: getString }, listTotal)
  }
  useEffect(() => {
    fetchData()
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    
    let from_date = moment()
    axios.get(url + "api/getTotalEmployeesOnLeave?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {
      let employeeOnLeave = response.data[0].count_id
      from_date = moment().subtract(1, 'd')
      axios.get(url + "api/getTotalEmployeesOnLeave?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseOne) => {
        let employeeOnLeaveYesterday = responseOne.data[0].count_id
        from_date = moment()
        axios.get(url + "api/getTotalLeaves?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Approved'", { headers }).then((responseTwo) => {
          let leavesApproved = responseTwo.data[0].count_id
          from_date = moment().subtract(1, 'd')
          axios.get(url + "api/getTotalLeaves?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Approved'", { headers }).then((responseThird) => {
            let leavesApprovedNum = responseThird.data[0].count_id
            from_date = moment()
            axios.get(url + "api/getTotalLeaves?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Pending'", { headers }).then((responseFourth) => {
              let leavesPending = responseFourth.data[0].count_id
              from_date = moment().subtract(1, 'd')
              axios.get(url + "api/getTotalLeaves?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Pending'", { headers }).then((responseFifth) => {
                let leavesPendingNum = responseFifth.data[0].count_id
                let from_date_out = moment()
                axios.get(url+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseSixth) => {
                  let totalOut = responseSixth.data[0]?.count_id
                  setTileData([
                    {
                      title: 'Total Employee',
                      value: employeeOnLeave,
                      num: employeeOnLeave - employeeOnLeaveYesterday,
                      link:"/leave_management/total-leaves"
                    },
                    {
                      title: 'Total Approved',
                      value: leavesApproved,
                      num: leavesApproved - leavesApprovedNum,
                      link:"/leave_management/leave-approved"
                    },
                    {
                      title: 'Total Pending.',
                      value: leavesPending,
                      num: leavesPending - leavesPendingNum,
                      link:"/leave_management/leave-pending"
                    },
                    {
                      title: 'Out From location',
                      value: totalOut,
                      link:"/all_attendence/total-outs"
                    }
                  ])
                })
              })
            })
          })
        })
      })
    })
  }, [])
  useEffect(() => {
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    let getString = url + "api/getLeaves?&limit="+limit+"&offset="+offset
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
          
          let to_date=moment(date[date.length-1])
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1])
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    const listLeave = (leave) => {
      setData(leave)
    }
    fetchLeaves({ url: getString }, listLeave)
    getString = url + "api/getLeaves?"
    if(employeeFilter.location_name!=''){
      getString+="&location_name="+employeeFilter.location_name
    }
    if(employeeFilter.employee_query!='' &&employeeFilter.employee_query!==undefined){
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
        
        let to_date=moment(date[date.length-1])
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      else if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      const listTotal = (leave) => {
        setTotal(leave.length)
      }
      fetchLeaves({ url: getString }, listTotal)



   
   

    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])


  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    // { heading: 'Floor' },
    { heading: 'Designation' },
    { heading: 'Department' },
    {heading:'Location'},
    {heading:'Status'}
  ]

  const tableKeys = [
    'employee_name', 'empID', 'role_name', 'department_name','location_name','status'
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
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
    })
    setNewVal(val)
    setObj(element)
  }
  const changeDate = (data) => {
    setLimit(10)
    setOffset(0)
    setDate(data)
  }
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
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }
  return (
    <React.Fragment>
      <Heading heading={'Total Approved Leaves'} Btn_link={'/add_leave'} Btn={'Leave'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} isdate={true} date={date} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk3={true} link2={'/leave_details'} link1={'/leave_approvals'} link4={false} />
      <AddLeaveModal value={newval} setval={setNewVal} Obj={obj} SuperVisor={SuperVisor}  />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>

export default ApprovedLeaves