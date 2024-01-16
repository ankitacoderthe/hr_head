import React,{useEffect,useRef} from 'react'
import classes from './SalarySlip2.module.css'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import Spl_Grade_table from '../../../Components/Spl_Grade_Table/Spl_Grade_table'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment'
import { ToWords } from 'to-words';
import ReactToPrint from 'react-to-print';
import { baseURL } from '../../../util'
// const div_data = [
//     {
//         title: "Name",
//         value: 'Puneet Shrivastav'
//     },
//     {
//         title: "Department",
//         value: 'Child'
//     },
//     {
//         title: "Emp No",
//         value: 424
//     },
//     {
//         title: "Bank Name",
//         value: 'PNB Bank'
//     },
//     {
//         title: "Designation",
//         value: 'Store Manager'
//     },
//     {
//         title: "Account No",
//         value: '01125902590'
//     },
// ]
const div_data2 = [
    {
        title: "Gross Salary",
        value: 123002
    },
    {
        title: 'Total Days in Month',
        value: 25
    },
    {
        title: "Absent Days",
        value: 2
    },
    {
        title: "Paid Days",
        value: 3
    },
    {
        title: "EPF",
        value: 2112
    },
    {
        title: "Health Insurance",
        value: 2434
    },
    {
        title: "Professional TAX",
        value: 2112
    },
    {
        title: "TDS",
        value: 2434
    }
]

// const t1_data = [
//     {
//         title: 'Basic Salary',
//         value: 30000
//     },
//     {
//         title: 'Hourse Rent Allowance',
//         value: 30000
//     },
//     {
//         title: 'Other Allowance',
//         value: 30000
//     }
// ]


const NewSalarySlip = () => {
    

    const componentRef = useRef();
    const [div_data2,setDivData2]=useState([])
    const navigate=useNavigate()
    const toWords = new ToWords({localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        }}}});
    const{id,month}=useParams()
    const [div_data,setDivData]=useState([])
    const [t1_data,setT1Data]=useState([])
    const [t2_data,setT2Data]=useState([])
const[salaryArray,setSalaryArray]=useState([])
    const cookies = new Cookies();
useEffect(()=>{
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
axios.get(baseURL+"api/getEmployeeDetails?id="+id,{headers:headers}).then((response)=>{
    console.log(response)
setDivData([
        {
            title: "Name",
            value: response.data.employeesResult[0].name
        },
        {
            title: "Department",
            value:  response.data.employeesResult[0].department_name
        },
        {
            title: "Emp No",
            value:  response.data.employeesResult[0].empID
        },
        {
            title: "Bank Name",
            value: response.data.employeesResult[0].bank_name!==null?response.data.employeesResult[0].bank_name:''
        },
        {
            title: "Designation",
            value: response.data.employeesResult[0].role_name
        },
        {
            title: "Account No",
            value: response.data.employeesResult[0].account_number
        },
    ])
})
//getSalarySlipDetails
let month_array=[]
for(let i=1 ;i<= month;i++){
  month_array.push(moment(new Date()).subtract(i,'month').month())  
}
console.log(month_array)
let queryString=''
month_array.forEach((month,index)=>{
if(index!==0){
queryString+="&month="+month
}
else{
queryString+="month="+month
}
})
axios.get(baseURL+"api/getSalarySlipDetails?"+queryString+"&id="+id,{headers:headers}).then((response)=>{
    console.log(response.data)
    setSalaryArray(response.data)
    let array=[]
    
    response.data.forEach((element)=>{
        if(element.pf!==null){
            array.push([ {
                title: 'Basic Salary',
                value: element.basic_salary?.toFixed(2)
            },
            {
                title: 'House Rent Allowance',
                value: element.hra?.toFixed(2)
            }])
                 
        }else{
            array.push([ {
                title: 'Total Computed',
                value: element.computed?.toFixed(2)
            },
            {
                title: 'Commission',
                value: element.commission?.toFixed(2)
            },
            {
                title: 'Tea',
                value: element.tea?.toFixed(2)
            },{
                title: 'Expense',
                value: element.expense?.toFixed(2)
            }])
        }
    }) 
    setT1Data(array)
    let secondArray=[]
    response.data.forEach((element)=>{
        if(element.pf!==null){
        secondArray.push( [{
            title: 'ESI',
            value: element.esi?.toFixed(2)
        },
        {
            title: 'Provident Fund',
            value: element.pf?.toFixed(2)
        },
        {
            title: 'Other Deduction',
            value: element.total_deductions.toFixed(2)
        }])
    }
    else{
        secondArray.push( [
        {
            title: 'Other Deduction',
            value: element.total_deductions.toFixed(2)
        }])
    }
    })
    
    setT2Data(secondArray)
    let thirdArray=[]
    response.data.forEach((element)=>{
        thirdArray.push( [{
            title: "Gross Salary",
            value: element.min_wages_as_per_rule?element.min_wages_as_per_rule:element.base_salary
        },
        {
            title: 'Total Days in Month',
            value: moment([element.year,element.month]).daysInMonth()
        },
        {
            title: "Absent Days",
            value: element.days_shown===null?moment([element.year,element.month]).daysInMonth()-element.working_days:moment([element.year,element.month]).daysInMonth()-element.days_shown
        },
        {
            title: "Paid Days",
            value: element.days_shown===null?element.working_days:element.days_shown
        },
        {
            title: "EPF",
            value: element.pf?.toFixed(2)
        },]
       )
    })
    setDivData2(thirdArray)
})

},[])

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   
    const getPageMargins = () => {
        return `@page { margin: 20px 20px 20px 20px !important; }`;
      };
    return (
        <React.Fragment>
            <div className={classes.module_header} ref={componentRef}>
                <h2>NARANG GARMENTS</h2>
                {
                    salaryArray.map((data,index)=>{
                        return <div>
                             <h5>Salary Slip For {monthArray[data.month]} {data.year}</h5>
                        <DetailsDivContainer  data={div_data} />
            <div className={classes.table_container}>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>Earning</h3>
                    <Spl_Grade_table marks={t1_data[index]} t2={'Amount'}>
                        <div className={classes.header}>
                            <span>Total</span>
                            <span>{data.total_earnings.toFixed(2)}</span>
                        </div>
                    </Spl_Grade_table>
                </div>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>Deductions</h3>
                    <Spl_Grade_table marks={t2_data[index]} t2={'Amount'}>
                        <div className={classes.header}>
                            <span>Total</span>
                            <span>{data.net_payable_salary!==null?Number(data.total_deductions.toFixed(2))+Number(data.esi?.toFixed(2))+Number(data.pf?.toFixed(2)):data.total_deductions.toFixed(2)}</span>
                        </div>
                    </Spl_Grade_table>
                </div>
            </div>
            <div className={classes.table_result}>
                <div className={classes.header}>
                    <span>Net Pay</span>
                    <span>{data.net_payable_salary!==null?data.net_payable_salary.toFixed(2):Number(data.total_earnings.toFixed(2))-Number(data.total_deductions.toFixed(2))}</span>
                </div>
                <div className={classes.header}>
                    <span>Amount in Words</span>
                    <span>{toWords.convert(data.net_payable_salary!==null?data.net_payable_salary.toFixed(2):Number(data.total_earnings.toFixed(2))-Number(data.total_deductions.toFixed(2)))}</span>
                </div>
            </div>
            <br />
            <div className={classes.module_bottom}>
                {div_data2[index].map((element,index)=>(
                    <DetailsDiv keey={index} title={element.title} value={element.value} />
                ))}
            </div>
            <br />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            
                    })
                }
               
            </div>
            <style>{getPageMargins()}</style>
            <ReactToPrint
        trigger={() =>  <div className={classes.btn_container}>
        <button className={classes.accept} >{'Print'}</button></div> }
        content={() => componentRef.current}
        copyStyles={true}
      />
           
        </React.Fragment>
    )
}

export default NewSalarySlip