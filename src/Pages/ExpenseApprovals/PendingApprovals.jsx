import React,{useState,useEffect} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
// Data for Table
import axios from 'axios'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import Pagination from '../../Components/Pagination/Pagination'
import { url } from '../../util'
const PendingApprovals = () => {
 
  const [Data,setData]=useState([])
  const [date,setDate]=useState(null)
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [totalExpense,setTotalExpense]=useState(0)
  const [totalExpenseNum,setTotalExpenseNum]=useState(0)
  const [totalEmpGranted,setTotalEmpGranted]=useState(0)
  const [totalEmpGrantedNum,setTotalEmpGrantedNum]=useState(0)
  const [totalPending,setTotalPending]=useState(0)
  const [totalPendingNum,setTotalPendingNum]=useState(0)
  const [total,setTotal]=useState(0)
  const [totalOuts,setTotalOuts]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    location_name:"",
    category_name:""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchExpenses } = useHttp()
  const [TileData ,setTileData]=useState([])
  const fetchData=()=>{
    let getString=url+"api/getExpenses?&limit="+limit+"&offset="+offset
    const listExpenses = (expenses) => {
      setData(expenses)
    }
    fetchExpenses({ url: getString }, listExpenses) 
    getString=url+"api/getExpenses"
    const listTotal = (expenses) => {
      setTotal(expenses.length)
    }
    fetchExpenses({ url: getString }, listTotal) 
  
  }
  // Here is our data for tile in the page
  useEffect(()=>{
    fetchData()
    const token = cookies.get('hr_head_token')
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
  
    from_date=moment()
    axios.get(url+"api/getTotalExpenseADay?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseOne)=>{
    setTotalExpense(responseOne.data[0].total===null?0:responseOne.data[0].total)
    from_date=moment().subtract(1,'d')
    axios.get(url+"api/getTotalExpenseADay?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseTwo)=>{
      responseTwo.data[0].total= responseTwo.data[0].total===null?0:responseTwo.data[0].total
        setTotalExpenseNum(responseOne.data[0].total-responseTwo.data[0].total)
        from_date=moment()
    axios.get(url+"api/getTotalEmployeesExpending?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
    setTotalEmpGranted(responseThird.data[0].total)
    from_date=moment().subtract(1,'d')
    axios.get(url+"api/getTotalEmployeesExpending?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
        setTotalEmpGrantedNum(responseThird.data[0].total-responseFourth.data[0].total)
        from_date=moment()
        axios.get(url+"api/getPendingExpenses?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFifth)=>{
        setTotalPending(responseFifth.data[0].total)
        from_date=moment().subtract(1,'d')
        axios.get(url+"api/getPendingExpenses?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSixth)=>{
            setTotalPendingNum(responseFifth.data[0].total-responseSixth.data[0].total)
            let from_date_out=moment()
        axios.get(url+"api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSeventh)=>{
            setTotalOuts(responseSeventh.data[0].count_id)
            setTileData( [
              {
                title: 'Total Expense',
                value: '₹'+responseOne.data[0].total===null?0:responseOne.data[0].total,
                num: responseOne.data[0].total===null?responseTwo.data[0].total===null?0:0-responseTwo.data[0].total:responseOne.data[0].total-responseTwo.data[0].total,
                link:"/expense_approvals/total_expense"
              },
              {
                title: 'Pending Approvals',
                value: responseFifth.data[0].total,
                num:responseFifth.data[0].total-responseSixth.data[0].total,
                link:"/expense_approvals/pending_approvals"
              },
              {
                title: 'Total Emp. Granted',
                value: responseThird.data[0].total,
                num: responseThird.data[0].total-responseFourth.data[0].total,
                link:"/expense_approvals/expense_approved"
              },
              {
                title: 'Out From location',
                value: responseSeventh.data[0].count_id,
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
    
      
  },[])
  useEffect(()=>{
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
   
    
      let getString=url+"api/getExpenses?&limit="+limit+"&offset="+offset+"&status='Pending'"
      if(employeeFilter.location_name!=''){
        getString+= "&location_name="+employeeFilter.location_name
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
        if(employeeFilter.category_name!=''){
          getString+="&category_name="+employeeFilter.category_name
        }
        if (date!==null){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
       
        const listExpenses = (expenses) => {
          setData(expenses)
        }
        fetchExpenses({ url: getString }, listExpenses) 
        getString=url+"api/getExpenses?status='Pending'"
        if(employeeFilter.location_name!=''){
          getString+= "&location_name="+employeeFilter.location_name
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
        if(employeeFilter.category_name!=''){
          getString+="&category_name="+employeeFilter.category_name
        }
        if (date!==null){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
       
        const listTotal = (expenses) => {
          setTotal(expenses.length)
        }
        fetchExpenses({ url: getString }, listTotal) 

    
  
   
      
      
        
      
      
  },[date,limit,offset,employeeFilter])
  const selectEntries=(data)=>{
    setLimit(data)
        }
        const selectPage=(data)=>{
          console.log(data)
            setOffset((data-1)*limit)
        }
  
  const changeDate=(data)=>{
    setDate(data)
}
  // Table Headings, Data and Keys
  
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
// if(!loading){
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
  const selectCategory=async(data) =>{
 
    setEmployeeFilter((prevState)=>{
      return {...prevState,category_name:data}
      })
}
  

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Expense'},
    {heading:'Expense Type'},
    {heading:'Request Date'},
    {heading:'Status'},
    {heading:'location'}
  ]

  const tableKeys = [
    'employee_name','empID','amount','category_name','date','status','location_name'
  ]

  return (
    <React.Fragment>
      <Heading Btn={'Expense'} Btn_link={'/add_expense'} heading={'Expense Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} d3={true} title3={'Expense Type'} selectByCategory={selectCategory} selectByFloor={selectByFloor}  selectBylocation={selectBylocation} />
      <Filter data={Data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <div className='whole_table_c'>
      <MainTable link1={'/expense_approval'} link4={false} link2={'/expense_details'} Lnk3={true}  App_Btn={false} data={Data} height={true} Btn={false} wd={'1250px'}   headings={tableHeadings} keys={tableKeys}  />
      </div>
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default PendingApprovals