import React, { useState ,useEffect} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/FilterWithMonthPicker/Filter'
import classes from './SalaryDetails.module.css'
import Pagination from '../../Components/Pagination/Pagination'
import MainTable from '../../Components/MainTable/MainTable'
import DownloadSalarySlip from '../../Components/AllModals/DownloadSalarySlip'
import useHttp from '../../Hooks/use-http'
import moment from 'moment'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { url } from '../../util'
import { ToastContainer, toast } from 'react-toastify'
import InpFile from '../../Components/InpFile/InpFile'
import NewInpFile from '../../Components/NewInpFile/NewInpFile'
const SalaryDetails = () => {
 
  const cookies = new Cookies();
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [date,setDate]=useState(new Date())
  const [monthSelected,setMonth]=useState(new Date().getMonth())
  const [yearSelected,setYearSelected]=useState(new Date().getFullYear())
  const [commissionData,setCommissionData]=useState(null)
  const token = cookies.get('hr_head_token')
  let headers = { "Authorization": "Bearer " + token }
  const[salary,setSalary]=useState([])
  const { sendRequest: fetchSalary } = useHttp()
  const [TileData,setTileData]=useState([])
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    location_name:""
  })
  const [total,setTotal]=useState(0)
  // Here is our data for tile in the page
 
  const selectBylocation=(data)=>{
   
    setEmployeeFilter((prevState)=>{
    return {...prevState,location_name:data}
    })
    
  }
  const selectByFloor=async(data) =>{
 
    setEmployeeFilter((prevState)=>{
      return {...prevState,floor_name:data}
      })
}
const uploadCommissionData=(data)=>{
  setCommissionData(data)
  headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
    axios.post(url+"/api/uploadCommissionData",{
      files:data
    },{headers}).then((response)=>{
      if(response.status===200){
        toast.success("File Uploaded Succcessfully")
      }
    }).catch((err)=>{
      if(err.request.status===409){

        toast.error("File is already uploaded")
      }
     else{
      toast.error("Some Error")
     }
    })
}
 
  const changeDate=(data)=>{
   
    setDate(data)
}
const changeByEmployee=(data)=>{
      
  // if(data.charAt(0)!=='1')
  //  {
    
    setEmployeeFilter((prevState)=>{
      return {...prevState,employee_query:data}
      })
    }
const changeByDesignation=(data)=>{
 
  setEmployeeFilter((prevState)=>{
  return {...prevState,role_name:data}
  })
  
}
useEffect(() => {
  axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'",{headers}).then((response)=>{
    axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'&type='PF'",{headers}).then((responseOne)=>{
      axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'&type='Cash'",{headers}).then((responseTwo)=>{
        let from_date=moment()
        axios.get(url+"api/getTotalFines?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
          if(responseThird.data[0].amount===null){
            responseThird.data[0].amount=0
          }
          from_date=moment().subtract(1,'d')
          axios.get(url+"api/getTotalFines?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
            if(responseFourth.data[0].amount===null){
              responseFourth.data[0].amount=0
            }
             setTileData ( [
              {
                title: 'Pending Salary Employee Count',
                value: response.data[0].count_id,
                link:"/salary_details/pending-salary"
                
              },
              {
                title: 'Pending  Salary PF Employee Count',
                value: responseOne.data[0].count_id,
                link:"/salary_details/pending-pf-salary"
              },
              {
                title: 'Pending  Salary Cash Employee Count',
                value: responseTwo.data[0].count_id,
                link:"/salary_details/pending-cash-salary"
              },
              {
                title: 'Total Fines',
                value: responseThird.data[0].amount,
                num:responseThird.data[0].amount- responseFourth.data[0].amount,
                link:"/fine_management/total-fines"
              }
            ])
   
          })
        })
      })
    })
  })
 
}, []);
const selectEntries=(data)=>{
  setLimit(data)
      }
      const selectPage=(data)=>{
        console.log(data)
          setOffset((data-1)*limit)
      }
  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Location'},
    {heading:'Monthly Salary'},
    {heading:'Status'}
  ]

  const tableKeys = [
    'employee_name','empID','floor_name','location_name', 'min_wages_as_per_rule','status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  useEffect(()=>{
    const listSalary=(Salary)=>{
      Salary.forEach((data)=>{
        data.month_days=moment([data.year,data.month]).daysInMonth()
        data.min_wages_as_per_rule=data.min_wages_as_per_rule!==null&&data.base_salary<data.min_wages_as_per_rule?data.min_wages_as_per_rule.toFixed(2):data.base_salary.toFixed(2)
      })
      setSalary(Salary)
    }
    const listTotal=(Salary)=>{
     
      setTotal(Salary.length)
    }
    if(monthSelected!==null){
      console.log(monthSelected)
      let monthObj=monthSelected
      let yearObj=yearSelected
  let queryString=url+"api/getAllSalary?month="+monthObj+"&limit="+limit+"&offset="+offset+"&year="+yearObj
  if(employeeFilter.employee_query!='' &&employeeFilter.employee_query!==undefined){
    queryString+="&employee_query="+employeeFilter.employee_query
  }
    if(employeeFilter.role_name!=''){
      queryString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      queryString+="&floor_name="+employeeFilter.floor_name
    }
    
    if(employeeFilter.location_name!==''){
      queryString+="&location_name="+employeeFilter.location_name
    }
  
      fetchSalary({url:queryString},listSalary)
      
      queryString=url+"api/getAllSalary?month="+monthObj+"&year="+yearObj
  if(employeeFilter.employee_query!='' &&employeeFilter.employee_query!==undefined){
    queryString+="&employee_query="+employeeFilter.employee_query
  }
    if(employeeFilter.role_name!=''){
      queryString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      queryString+="&floor_name="+employeeFilter.floor_name
    }
    
    if(employeeFilter.location_name!==''){
      queryString+="&location_name="+employeeFilter.location_name
    }
  
      fetchSalary({url:queryString},listTotal)
    }
  },[monthSelected,employeeFilter,limit,offset])
 
  return (
    <React.Fragment>
      <DownloadSalarySlip value={newval} setval={setNewVal} Obj={obj} />
      <div className={classes.container}>
      <Heading heading={'Salary Details'} />
      <NewInpFile func={uploadCommissionData}/>
      </div>
      <ToastContainer></ToastContainer>
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor}  selectBylocation={selectBylocation}    />
      <Filter date={date}  data={salary} changeYear={setYearSelected}  changeMonth={setMonth}  changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <br/>
      <br />
     
      {/* <input type="file" name="commisionData" id="commisionData" onChange={(e)=>uploadCommissionData(e)} accept='.csv'/>
      <button onClick={uploadFile}>Upload</button> */}
     
      <MainTable func={changeModalState} data={salary} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={false} link2={'/salary_certificate'} t1={'Make salary slip'} t2={'Make certificate'} link3={'false'} t3={'Download salary slip'} link4={'/overall_salary_details'} t4={'View Salary Details'} App_Btn={true} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default SalaryDetails