import React, { useState,useEffect } from 'react'
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
import { url } from '../../util'
import classes from './LoanEmi.module.css'
const LoanPending = () => {
  
  const [SuperVisor, setSuperVisor]=useState(null)
 
  // Here is our data for tile in the page
  const [date,setDate]=useState([new Date],new Date())
 const [data,setData]=useState([])
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    location_name:""
  })
  
  const [total,setTotal]=useState(0)
  const cookies = new Cookies();
  
  const token = cookies.get('hr_head_token')
  const { sendRequest: fetchLoan } = useHttp()
  const [TileData ,setTileData]=useState([])
  const fetchData=()=>{
    let getString = url + "api/getLoans?&limit="+limit+"&offset="+offset+"&status='Pending'"
    if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
    const listLeave = (leave) => {
      setData(leave)
    }
    fetchLoan({ url: getString }, listLeave)
    getString = url + "api/getLoans?status='Pending'"
    if (date?.length>0){
        let from_date=moment(date[0])
        
        let to_date=moment(date[date.length-1]).add(1,'d')
        getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
      }
    const listTotal = (leave) => {
      setTotal(leave.length)
    }
    fetchLoan({ url: getString }, listTotal)
  }
  useEffect(() => {
    fetchData()
    const token = cookies.get('hr_head_token')
      const headers={"Authorization":"Bearer "+token}
      let from_date=moment()
     
     
      from_date=moment()
      axios.get(url+"api/getTotalLoansGranted?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+" and loan_status='Approved'",{headers}).then((response)=>{
       
        from_date=moment().subtract(1,'d')
        axios.get(url+"api/getTotalLoansGranted?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+" and loan_status='Approved'",{headers}).then((responseOne)=>{
          
          from_date=moment()
          axios.get(url+"api/getTotalEmployeesTakenLoan?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseTwo)=>{
    from_date=moment().subtract(1,'d')
  axios.get(url+"api/getTotalEmployeesTakenLoan?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
    
    from_date=moment()
    axios.get(url+"api/getTotalPendingEmis?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
      from_date=moment().subtract(1,'d')

   axios.get(url+"api/getTotalPendingEmis?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFifth)=>{
    
   let from_date_out=moment()
      axios.get(url+"api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSixth)=>{ 
             let totalOut= responseSixth.data[0]?.count_id 
           setTileData( [
              {
                title: 'Total Loans Granted',
                value:  response.data[0].amount!==null?response.data[0].amount:0,
                num:response.data[0].amount!==null&&responseOne.data[0].amount? response.data[0].amount-responseOne.data[0].amount:0,
                link:"/loan_emi/total-loans"
              },
              {
                title: 'Total Emp Granted',
                value: responseTwo.data[0].count_id
                ,
                num: responseTwo.data[0].count_id
                -responseThird.data[0].count_id,
                link:"/loan_emi/total-granted"
              },
              {
                title: 'Total Pending Loans',
                value: responseFourth.data[0].count_id,
               num:responseFourth.data[0].count_id-responseFifth.data[0].count_id,
               link:"/loan_emi/total-pending"
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
    },[])
  useEffect(()=>{
   
    
    
  let getString=url+"api/getLoans?limit="+limit+"&offset="+offset+"&status='Pending'"
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
      const listLoan = (loan) => {
        setData(loan)
      }
      fetchLoan({ url: getString }, listLoan) 
      getString=url+"api/getLoans?status='Pending'"
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
          const listTotal = (loan) => {
            setTotal(loan.length)
          }
          fetchLoan({ url: getString }, listTotal) 
    
      // axios.get(getString,{headers}).then((response)=>{
      //       setData(response.data)
      //   })
  },[date,limit,offset,employeeFilter])
 
  // Here is our data for tile in the page
  // const TileData = [
  //   {
  //     title: 'Total Employee',
  //     value: '130',
  //     num: 2
  //   },
  //   {
  //     title: 'Trails Employee',
  //     value: 9,
  //     num: 2
  //   },
  //   {
  //     title: 'Total Depart.',
  //     value: 8,
  //     num: 3
  //   },
  //   {
  //     title: 'Out From location',
  //     value: 23,
  //     num: -12
  //   }
  // ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Location'},
    {heading:'Amount'},
    {heading:'Tenure'},{
      heading:'Request Status'
    }
  ]

  const tableKeys = [
    'employee_name','empID','floor_name','location_name','amount' ,'tenure', 'status'
  ]
  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  
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
const selectEntries=(data)=>{
  setLimit(data)
      }
      const selectPage=(data)=>{
        console.log(data)
          setOffset((data-1)*limit)
      }

  return (
    <React.Fragment>
      <Heading heading={'Loan EMI'} Btn_link={'/add_loan'} Btn={'Loan'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor}  selectBylocation={selectBylocation}    />
      <Filter data={data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <div className={classes.whole_table_c}>
      <MainTable link1={'/loan_approvals'} link4={false} link2={'/loan_details'} Lnk3={true}  App_Btn={false} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} wd={'1300px'}  />
      </div>
      {/* <AddLoanModal value={newval} setval={setNewVal} Obj={obj} SuperVisor={SuperVisor}  /> */}
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default LoanPending