import React,{useEffect,useState,useRef} from 'react'
import classes from './SalaryCerti.module.css'
import Spl_Grade_table from '../../../Components/Spl_Grade_Table/Spl_Grade_table'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useParams,useNavigate } from 'react-router-dom'
import moment from 'moment'

import ReactToPrint from 'react-to-print';
import { baseURL } from '../../../util'
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
// const t2_data = [
//     {
//         title: 'ESI',
//         value: 30000
//     },
//     {
//         title: 'Provident Fund',
//         value: 30000
//     },
//     {
//         title: 'Other Deduction',
//         value: 30000
//     }
// ]

const SalaryCerti = () => {
    const componentRef = useRef();
    const [data,setData]=useState(null)
    const cookies = new Cookies();
    const{id,month,year,purpose}=useParams()
    const [t1_data,setT1Data]=useState([])
    const [t2_data,setT2Data]=useState([])
    const [t2Total,setT2Total]=useState(0)
    const [t1Total,setT1Total]=useState(0)

    useEffect(()=>{
        const token = cookies.get('hr_head_token')
        const headers = { "Authorization": "Bearer " + token }
    axios.get(baseURL+"api/getEmployeeDetails?id="+id,{headers:headers}).then((response)=>{
        setData(response.data)
    })
    console.log(moment().month())
    axios.get(baseURL+"api/getSalarySlipDetails?month="+(month)+"&id="+id+"&year="+year,{headers:headers}).then((response)=>{
        if(response.data[0].pf!==null){
            setT1Data([
                {
                            title: 'Basic Salary',
                            value: response.data[0].basic_salary
                        },
                        {
                            title: 'House Rent Allowance',
                            value: response.data[0].hra
                        },
                       
            
            ])
            setT1Total(Number(response.data[0].basic_salary)+Number(response.data[0].hra))
            setT2Data([{
                title: 'ESI',
                value: response.data[0].esi.toFixed(2)
            },
            {
                title: 'Provident Fund',
                value: response.data[0].pf.toFixed(2)
            },
            {
                title: 'Other Deduction',
                value: response.data[0].total_deductions.toFixed(2)
            }])
            setT2Total( (Number( response.data[0].esi)+Number(response.data[0].pf)+Number(response.data[0].total_deductions)).toFixed(2))
        }
        else{
            setT1Data([
                {
                            title: 'Salary Computed',
                            value: response.data[0].computed
                        },{
                            title: 'Commission',
                            value: response.data[0].commission
                        },{
                            title: 'Tea',
                            value: response.data[0].tea
                        },{
                            title: 'Expense',
                            value: response.data[0].expense
                        }
                       
            
            ])
            setT1Total(Number(response.data[0].computed)+Number(response.data[0].commission)+Number(response.data[0].tea)+Number(response.data[0].expense))
            setT2Data([
            {
                title: 'Other Deduction',
                value: response.data[0].total_deductions.toFixed(2)
            }])
            setT2Total( response.data[0].total_deductions.toFixed(2))
        }


    })
    },[])
   
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const getPageMargins = () => {
        return `@page { margin: 20px 20px 20px 20px !important; }`;
      };
    return (
        <React.Fragment>
            <div ref={componentRef}>
            <div className={classes.module_header}>
                <h2>To Whom it may conern</h2>
                <p>{moment().format("DD-MM-YYYY")}</p>
            </div>
            <br />
            <br />
            <p className={classes.p}>
                This is to certify that {data?.employeesResult[0].name} has been employeed with employee id {data?.employeesResult[0].empID} since {data?.employeesResult[0].hiring_date_time.split(" ")[0].split("-").reverse().join("-")} and is currenttly working as {data?.employeesResult[0].role_name}.<br/>
                The gross salary of the employee for the {monthArray[month]} from  {monthArray[month]}/{year} to {monthArray[month]}/{year}  is as follows :
            </p>
            <div className={classes.table_container}>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>Gross Salary Calculation</h3>
                    <Spl_Grade_table marks={t1_data} t2={'Amount'}>
                        <div className={classes.header}>
                            <span>Total</span>
                            <span>{t1Total.toFixed(2)}</span>
                        </div>
                    </Spl_Grade_table>
                </div>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>Deduction Calculation</h3>
                    <Spl_Grade_table marks={t2_data} t2={'Amount'}>
                        <div className={classes.header}>
                            <span>Total</span>
                            <span>{t2Total}</span>
                        </div>
                    </Spl_Grade_table>
                </div>
            </div>
            <br />
            <div className={classes.bottom_div}>
                <h4 className={classes.colored}>Net salary (Gross-Salary-Deduction) : {t1Total-(t2Total)} </h4>
                <br />
                <p className={classes.p}>This certificate is being upon the request of the employee for {purpose} . We confirm that the above details and true and accurate to the best of our knowledge.</p>
                <br />
                <h5>Sincerely,</h5>
                <h5>[HR Team]</h5>
                <h5>[Company name with official stamp]</h5>

            </div>
<br />
<style>{getPageMargins()}</style>
            <ReactToPrint
        trigger={() =>  <div className={classes.btn_container}>
        <button className={classes.accept} >{'Print'}</button></div> }
        content={() => componentRef.current}
        copyStyles={true}
      />
</div>
           
        </React.Fragment>

    )
}

export default SalaryCerti