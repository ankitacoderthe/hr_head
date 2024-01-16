import React, { useEffect,useState,useRef } from 'react'
import ReactToPrint from 'react-to-print';
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './SalarySummaryDetails.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import useHttp from '../../../Hooks/use-http'
import moment from 'moment'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { baseURL } from '../../../util';
const SalarySummaryDetails = () => {
    const componentRef = useRef();
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    const [employee_data,setEmployeeData]=useState([])
   
    const [fixed_data, setFixedData]=useState([])
    const { sendRequest: fetchSalary } = useHttp()
    const { sendRequest: fetchDownload } = useHttp()
    const {id}=useParams()
     const [table_keys,setTableKeys]=useState([])
    const [table_headings,setTableHeadings]=useState([])

    const navigate=useNavigate()
    useEffect(()=>{
   
        // if(token===null){
        // navigate('/login')
        // }
        
        
          const listSalary=(Salary)=>{
           if(Salary[0].esi!==null){
            setFixedData([
                {
                    "title": 'Salary',
                    "val_a": Salary[0].net_salary.toFixed(2),
                    "val_b":Salary[0].net_payable_salary.toFixed(2)
                },
                {
                    'title': 'Monthly Days',
                    "val_a": moment().daysInMonth(),
                    "val_b": moment().daysInMonth()
                },
                {
                    "title": 'Working Days',
                    "val_a":Salary[0].working_days ,
                    "val_b": Salary[0].days_shown
                },
                {
                    "title": 'Basic Pay',
                    "val_a": Salary[0].amount.toFixed(2),
                    "val_b": Salary[0].min_wages_as_per_rule
                },
                {
                    "title": 'Commission',
                    "val_a": Salary[0].commission.toFixed(2),
                    "val_b": ''
                },
                {
                    "title": 'Expenses',
                    "val_a": Salary[0].expense.toFixed(2),
                    "val_b": ''
                },
                {
                    "title": 'Tea',
                    "val_a":  Salary[0].tea,
                    "val_b": ''
                },
                {
                    "title": 'Gross Salary',
                    "val_a": Salary[0].net_salary.toFixed(2),
                    "val_b": Salary[0].net_salary.toFixed(2)
                },
                {
                    "title": 'ESIC',
                    "val_a": Salary[0].esi.toFixed(2),
                    "val_b": Salary[0].esi.toFixed(2)
                },
                {
                    "title": 'EPF',
                    "val_a": Salary[0].pf.toFixed(2),
                    "val_b": Salary[0].pf.toFixed(2)
                },
               
                {
                    "title": 'Current Advance',
                    "val_a": Salary[0].advance.toFixed(2),
                    "val_b": ''
                },
                {
                    "title": 'Loan Emi',
                    "val_a": Salary[0].loan_emi.toFixed(2),
                    "val_b": ''
                },
                {
                    "title": 'Net Pay Salary',
                    "val_a": '',
                    "val_b": Salary[0].net_payable_salary.toFixed(2)
                },
                {
                    "title": 'Net Pay Incentive',
                    "val_a": '',
                    "val_b": Salary[0].cash_incentive.toFixed(2)
                },
            ])
        setTableKeys(['title', 'val_a','val_b'])
        setTableHeadings( [
            { heading: '' },
            { heading: 'Actual Salary' },
            { heading: 'As Per Rule Salary' },
        ])
     
           }
           else{
            console.log("hello")
            setFixedData([
                {
                    "title": 'Salary',
                    "val_a": Salary[0].total_earnings.toFixed(2),
                    
                },
                {
                    'title': 'Monthly Days',
                    "val_a": moment().daysInMonth(),
                    
                },
                {
                    "title": 'Working Days',
                    "val_a":Salary[0].working_days ,
                    
                },
                {
                    "title": 'Basic Pay',
                    "val_a": Salary[0].amount.toFixed(2),
                    
                },
                {
                    "title": 'Commission',
                    "val_a": Salary[0].commission.toFixed(2),
                  
                },
                {
                    "title": 'Expenses',
                    "val_a": Salary[0].expense.toFixed(2),
                   
                },
                {
                    "title": 'Tea',
                    "val_a":  Salary[0].tea,
                    
                },
                {
                    "title": 'Gross Salary',
                    "val_a": Salary[0].net_salary.toFixed(2),
                    
                },
               
                {
                    "title": 'Current Advance',
                    "val_a": Salary[0].advance,
                    
                },
                {
                    "title": 'Loan Emi',
                    "val_a": Salary[0].loan_emi,
                   
                },
                
            ])
            setTableKeys(['title', 'val_a'])
            setTableHeadings(  [
                { heading: '' },
                { heading: 'Actual Salary' },
                
            ])
       
    
           }
       
            setEmployeeData([{
                title:"Name",
                value:Salary[0].employee_name
              },{
          title:'SuperVisor Name',
          value:Salary[0].head_employee_name
              },{
                title:'Designation',
          value:Salary[0].role_name
              },{
                title:'Floor Name',
          value:Salary[0].floor_name
          
                }, {
                  title: 'Gender',
                  value: Salary[0].gender
          
                }, {
                  title: 'location name',
                  value: Salary[0].location_name
                }, {
                  title: 'location Department',
                  value: Salary[0].store_department_name
                }])
                
        
          }
          fetchSalary({url:baseURL+"api/getSalary?id="+id},listSalary)
    },[])
console.log(fixed_data)

  
   

// const Print=(e)=>{
// e.preventDefault()

//     var printContents = document.getElementById('Salary_Summary').innerHTML;
//     var originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;

//     window.print();

//     document.body.innerHTML = originalContents;



// }
const getPageMargins = () => {
    return `@page { margin: 20px 20px 20px 20px !important; }`;
  };
    return (
        <React.Fragment>
             <style>{getPageMargins()}</style>
            <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
            <div ref={componentRef}>
            <Heading heading={'Salary Summary'} />
            <DetailsDivContainer data={employee_data} />
            <br />
            <h3 className='uni_heading'>Data</h3>
            <MainTable headings={table_headings} keys={table_keys} data={fixed_data}  />
            <br /><br />
            {/* <h3 className='uni_heading'>Other Details</h3>
            <div className={classes.container}>
                {employee_data.map((val, index) => (
                    <DetailsDiv num={index} key={index} title={val.title} value={val.value} />
                ))}
            </div>
            <BottomButtonContainer func={true} cancel={'Cancel'} approve={'Download Summary'} cancelRequests={cancelRequests} func2={download} /> */}
            {/* <button className={classes.salary_history_btn} onClick={(e)=>Print(e)}>Print</button> */}
            </div>
           </React.Fragment>
    )
}

export default SalarySummaryDetails
