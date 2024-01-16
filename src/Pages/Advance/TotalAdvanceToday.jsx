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
import { url } from '../../util'
const TotalAdvanceToday = () => {
  const baseURL=url
  
  // Here is our data for tile in the page
  const [date, setDate] = useState([new Date(),new Date()])
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  
  const [total,setTotal]=useState(0)
  const cookies = new Cookies();
  const { sendRequest: fetchAdvance } = useHttp()
  const [TileData, setTileData] = useState([])

  const [SuperVisor, setSuperVisor] = useState(null)
  const token = cookies.get('hr_head_token')
  // Here is our data for tile in the page
  const fetchData=()=>{
    let getString = baseURL + "api/getAdvances?limit="+limit+"&offset="+offset
    if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      
    const listAdvance = (advance) => {
      setData(advance)
    }
    fetchAdvance({ url: getString }, listAdvance)
    getString = baseURL + "api/getAdvances?"
    if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
      
    const listTotal = (advance) => {
      setTotal(advance.length)
    }
    fetchAdvance({ url: getString }, listTotal)

  }
  useEffect(() => {
fetchData()
    const headers = { "Authorization": "Bearer " + token }
   
    let from_date = moment()
    axios.get(baseURL + "api/getTotalAdvanceGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {

      from_date = moment().subtract(1, 'd')
      axios.get(baseURL + "api/getTotalAdvanceGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseOne) => {

        from_date = moment()
        axios.get(baseURL + "api/getTotalEmployeesGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseTwo) => {
          from_date = moment().subtract(1, 'd')
          axios.get(baseURL + "api/getTotalEmployeesGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseThird) => {

            from_date = moment()
            axios.get(baseURL + "api/getTotalUnpaidAdvance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseFourth) => {
              from_date = moment().subtract(1, 'd')
              axios.get(baseURL + "api/getTotalUnpaidAdvance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseFifth) => {
            

              let from_date_out = moment()
              axios.get(baseURL+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseSixth) => {
                let totalOut = responseSixth.data[0]?.count_id
                response.data[0].amount = response.data[0].amount === null ? 0 : response.data[0].amount
                responseOne.data[0].amount = responseOne.data[0].amount === null ? 0 : responseOne.data[0].amount

                setTileData([
                    {
                      title: 'Total Advance ',
                      value: response.data[0].amount,
                      num: response.data[0].amount - responseOne.data[0].amount,
                      link:"/advance/total-advance"
                    },
                    {
                      title: 'Total Emp Granted',
                      value: responseTwo.data[0].count_id
                      ,
                      num: responseTwo.data[0].count_id
                        - responseThird.data[0].count_id,
                        link:"/advance/total-granted"
                    },
                    {
                      title: 'Total Pending Advance',
                      value: responseFourth.data[0].count_id,
  num:responseFourth.data[0].count_id-responseFifth.data[0].count_id,
  link:"/advance/total-pending"
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
    
      let getString = baseURL + "api/getAdvances?limit="+limit+"&offset="+offset
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
        
       
        const listAdvance = (advance) => {
          setData(advance)
        }
        fetchAdvance({ url: getString }, listAdvance)
        getString = baseURL + "api/getAdvances?"
        if(employeeFilter.location_name!=''){
          getString+="location_name="+employeeFilter.location_name
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
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        
       
        const listTotal = (advance) => {
          setTotal(advance.length)
        }
        fetchAdvance({ url: getString }, listTotal)

      
  

    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])



  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    // { heading: 'Floor' },
    { heading: 'Location' },
    { heading: 'Designation' },
    { heading: 'Advance' },
    {heading:'Request Status'}
  ]

  const tableKeys = [
    'employee_name', 'empID',  'location_name','role_name', 'amount','status'
  ]
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(baseURL + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
    })
    setNewVal(val)
    setObj(element)
  }
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
      <Heading heading={'Advance'}  Btn_link={'/add_advance'} Btn={'Advance'}  />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'}
        selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} date={date} isdate={true} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk3={true} link1={'/advance_approvals'} link2={'/advance_details'} link4={false} App_Btn={false} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys}  />

      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>
export default TotalAdvanceToday