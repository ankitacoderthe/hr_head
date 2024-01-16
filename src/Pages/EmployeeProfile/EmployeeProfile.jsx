import React, { useState, useEffect } from 'react'
import classes from './EmployeeProfile.module.css'
import DetailsDiv from '../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../Components/Heading/Heading'
import MainTable from '../../Components/MainTable/MainTable'
import EmployeeActualProfile from './EmployeeActualProfile/EmployeeActualProfile'
import EmployeeBarGraph from './EmployeeBarGraph/EmployeeBarGraph'
import DownloadDocuments from './Tables/DownloadDocuments/DownloadDocuments'
import IncrementHistory from './Tables/IncementHistory/IncrementHistory'
import SalaryHistory from './Tables/SalaryHistory/SalaryHistory'
import { Link, useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import Cookies from 'universal-cookie'
import { Route, useParams } from 'react-router-dom'
import { url } from '../../util'
import axios from 'axios'
const documents_table_headings = [
    { heading: 'Document name' },
    { heading: 'Upload Date' },
    { heading: '' },
    { heading: 'Preview' },
    { heading: 'Option' }
]
const documents_table_keys = ['name', 'created_on', '','document', 'download', ]
const personal_details = [
    {
        title: 'Date Of Birth',
        value: '13/08/2022'
    },
    {
        title: 'Fathers Name',
        value: 'Rajendera Shrivastav'
    },
    {
        title: 'Qualification',
        value: 'BCA'
    },
    {
        title: 'Gender',
        value: 'male'
    },
    {
        title: 'Floor',
        value: '1st Floor'
    },
    {
        title: 'Marital Status',
        value: 'Unmarried'
    }
]
const job_details = [
    {
        title: 'Department',
        value: 'Kids'
    },
    {
        title: 'Designation',
        value: 'Front-End Developer'
    },
    {
        title: 'Hired by',
        value: 'Rohan D Mishra'
    },
    {
        title: 'Head Employee',
        value: 'Akash D Mishra'
    },
    {
        title: 'Hiring Date',
        value: '20/04/2023'
    },
    {
        title: 'Consultancy',
        value: 'Contractual Based'
    },
    {
        title: 'Job Location',
        value: 'Narang Lagpat Nagar'
    },
    {
        title: 'Supervisior',
        value: 'Anil D Mishra'
    },
    {
        title: 'EPF/ESI no.',
        value: 'AKSDJHJ525ASD'
    }
]
const advance_table_headings = [
    { heading: 'Advance Amount' },
    { heading: 'Approval' },
    { heading: 'Status' }
]
const advance_table_keys = ['amount', 'advance_status', 'payment_status']
const loan_table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Tenure' },
    
]
const loan_table_keys = ['amount', 'tenure',]

const EmployeeProfile = () => {
    const navigate=useNavigate()
    const cookies = new Cookies();
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [personalDetails, setPersonalDetails] = useState([])
    const [localAddress, setLocalAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [jobDetails, setJobDetails] = useState([])
    const [documentsDetails, setDocumentsDetails] = useState([])
    const [documentsData, setDocumentsData] = useState([])
    const [advanceData, setAdvanceData] = useState([])
    const [loanData, setLoanData] = useState([])
    const [loanEMIData, setEMILoanData] = useState([])
    const [loanId, setLoanId] = useState('')
    const [IncrementData, setIncrementData] = useState([])
    const [salaryData, setSalaryData] = useState([])
    const restructureLoan = (month) => {
        const token = cookies.get('hr_head_token')
       
        const headers = { "Authorization": "Bearer " + token }
        axios.post(url+"api/restructureLoans", {
            loan_id: loanId,
            month: month
        }, { headers }).then(() => {

        })

    }
    const { id } = useParams()
    const [employee_id, setEmployeeId] = useState(id)
    useEffect(() => {
        const token = cookies.get('hr_head_token')
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url+"api/getEmployeeDetails?id=" + id, { headers }).then((response) => {

            console.log('employee proile data', response.data);
            
                setPersonalDetails([
                    {
                        title: 'Date Of Birth',
                        value: response.data.employeesResult[0]?.dob?.split(" ")[0].split("-").reverse().join("-")
                    },
                    {
                        title: 'Fathers Name',
                        value: response.data.employeesResult[0]?.father_name
                    },
                    {
                        title: 'Qualification',
                        value: response.data.employeesResult[0]?.qualification
                    },
                    {
                        title: 'Gender',
                        value: response.data.employeesResult[0]?.gender
                    },
                    {
                        title: 'Floor',
                        value: response.data.employeesResult[0]?.floor_name
                    },
                    {
                        title: 'Marital Status',
                        value: response.data.employeesResult[0]?.marital_status
                    }

                ])
                setLocalAddress(response.data.employeesResult[0]?.local_address)
                setPermanentAddress(response.data.employeesResult[0]?.permanent_address)
                setJobDetails([
                    {
                        title: 'Employee Type',
                        value: response.data.employeesResult[0]?.type
                    },
                    {
                        title: 'Employee Sub Type',
                        value: response.data.employeesResult[0]?.sub_type
                    },
                    {
                        title: 'Hired by',
                        value: response.data.hiredByEmployeeResult[0].hired_by_employee_name
                    },
                    {
                        title: 'Head Employee',
                        value: response.data.headEmployeesResult[0].head_employee_name
                    },
                    {
                        title: 'Hiring Date',
                        value: response.data.employeesResult[0]?.hiring_date_time.split(" ")[0].split("-").reverse().join("-")
                    },
                    {
                        title: 'Consultancy',
                        value: response.data.employeesResult[0].lead_from
                    },
                    {
                        title: 'Job Location',
                        value: response.data.employeesResult[0].location_name
                    },
                    {
                        title: 'Supervisor Name',
                        value: response.data.hiredByEmployeeResult[0].supervisor_name
                    },
                    {
                        title: 'EPF No',
                        value: response.data.employeesResult[0].epf_no
                    },
                    {
                        title: 'ESI No',
                        value: response.data.employeesResult[0].esi_no
                    }, {
                        title: 'UAN NO',
                        value: response.data.employeesResult[0].uan_no
                    },
                    {
                        title: 'Department',
                        value: response.data.employeesResult[0]?.department_name
                    },
                    {
                        title: 'Designation',
                        value: response.data.employeesResult[0]?.role_name
                    },
                    {
                        title: 'Base Salary',
                        value: response.data.employeesResult[0]?.amount
                    }
                ])
                setDocumentsDetails([
                    {
                        title: 'Aadhar Card',
                        value: response.data.employeesResult[0]?.aadhar_no
                    },
                    {
                        title: 'Pan NO',
                        value: response.data.employeesResult[0]?.pan_no
                    },
                    {
                        title: 'Fine Management',
                        value: response.data.employeesResult[0].fine_management === 1 ? 'Yes' : 'No'
                    },
                    {
                        title: 'Bank Name',
                        value: response.data.employeesResult[0].bank_name
                    },
                    {
                        title: 'Branch',
                        value: response.data.employeesResult[0].branch
                    },
                    {
                        title: 'IFSC',
                        value: response.data.employeesResult[0].ifsc
                    },
                    {
                        title: 'Account Number',
                        value: response.data.employeesResult[0].account_number
                    }
                ])
                console.log('doc result is here', response.data.documentResult)
                const data = response.data.documentResult
                if (data.length > 0 && data !== undefined && data !== null) {
                    data.forEach((d) => {
                        d.created_on = d.created_on.split(" ")[0].split("-").reverse().join("-")
                        d.document = d.name
                        d.download=d.name
                    })


                    setDocumentsData(data)
                }
                const dataSecond = response.data.advanceResult
                dataSecond.forEach((data) => {
                    if (data.advance_status === 'Approved') {
                        data.advance_status = data.status_date.split(" ")[0].split("-").reverse().join("-")
                    }
                })
                setAdvanceData(dataSecond)

                setLoanData(response.data.loanResult)
                let loanThirdData = response.data.loanResult
                setLoanId(loanThirdData[0]?.id)
                let array = []
                //    loanThirdData.forEach((data)=>{
                // if(data.status==='Paid'){
                // data.restructure=false
                // }
                // else{
                // data.restructure=true
                // }
                //    })

                console.log(loanThirdData)
                setEMILoanData(loanThirdData)
            })

    

        axios.get(url + "api/getSalaryIncrement?employee_id=" + id, { headers }).then((response) => {
            response.data.forEach((data)=>{
                data.increment=data.increment?.toFixed(2)
                data.amount=data.amount?.toFixed(2)
                
            })
            setIncrementData(response.data)
        })
        axios.get(url + "api/getSalaryHistory?employee_id=" + id, { headers }).then((response) => {
            response.data.forEach((data)=>{
                data.month=monthArray[data.month]
                data.net_payable_salary= data.net_payable_salary===null?data.net_salary:data.net_payable_salary
            })
            setSalaryData(response.data)
        })


    }, [])
    const incrementTableHeadings = [
        { heading: 'Salary' },
        { heading: 'Increment' },
        { heading: 'Type' },
        { heading: 'Date of Increment' }
    ]

    const incrementTableKeys = [ 'amount','increment' ,'increment_type', 'date' ]
    const salaryTableHeading = [
        { heading: 'Salary Month' },
       
        { heading: 'Salary' },
        { heading: 'Status' },
       
    ]

    const salaryTableKeys = ['month','empID','net_payable_salary', 'paid_status' ]
    const deleteEmployee=()=>{
        const token = cookies.get('hr_head_token')
       
        const headers = { "Authorization": "Bearer " + token }
            axios.patch(url+"api/deleteEmployee/"+id,{},{headers}).then((response)=>{
                 if(response.status===200){
    
                     toast.success('Employee Deleted Successfully')
                     setTimeout(() => {
                         navigate(-1)
                     }, 1000);
                 }
            })
        }
    return (
        <React.Fragment>
           <Heading heading={'Employee Profile'} deleteBtn={false} deleteFn={deleteEmployee} Btn_link={'/edit_employee'} Btn={'Employee'} isEdit={true} id={id} />
           <ToastContainer></ToastContainer>
            <div className={`${classes.container} uni_container`}>
                <div className={classes.container_left}>
                    <EmployeeActualProfile />
                </div>
                <div className={classes.container_right}>
                    <h3 className='uni_heading'>Personal Details</h3>
                    <div className={classes.wrap}>
                        {personalDetails.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                        <div className={classes.w100_div}>
                            Local Address
                            <span>
                                {localAddress}
                            </span>
                        </div>
                        <div className={classes.w100_div}>
                            Permanent Address
                            <span>
                                {permanentAddress}
                            </span>
                        </div>
                    </div>

                    <h3 className='uni_heading'>Job Details</h3>
                    <div className={classes.wrap}>
                        {jobDetails.map((val, index) => (
                            val.title=='Designation' || val.title=='Department' ?
                            <DetailsDiv cls2={true} num={index} title={val.title} value={val.value} />:
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                        
                    </div>



                    <h3 className='uni_heading'>Documents & Bank Details</h3>
                    <div className={classes.wrap}>
                        {documentsDetails.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                    </div>
                </div>
            </div>
            <h3 className='uni_heading'>Download Documents</h3>

            <MainTable headings={documents_table_headings} keys={documents_table_keys} data={documentsData} />
            <br />
            <br />
            <h3 className='uni_heading'>Advance & Loan Emi</h3>
            <h4 className={classes.h4_heading}>Advance</h4>
            <MainTable headings={advance_table_headings} keys={advance_table_keys} data={advanceData} />
            <br />
            <br />
            <h4 className={classes.h4_heading}>Loan</h4>
            {/* <div className={classes.container}>
                <div className={classes.container_heading}>Loan Amount</div>
                <div>{loanData[0]?.loan_amount}</div>
                <div className={classes.container_heading}>Tenure</div>
                <div>{loanData[0]?.tenure}</div>
                <div className={classes.container_heading}>Approval Status</div>
                <div>{loanData[0]?.loan_status}</div>
                <div className={classes.container_heading}>Month</div>
                <div>{monthArray[loanData[0]?.month]}</div>
            </div> */}

           {loanData.length>0&&<Link to={'/emi_details_all_loans/' + employee_id} className='uni_link'>View All</Link>}
            <MainTable restructureLoan={restructureLoan} headings={loan_table_headings} keys={loan_table_keys} data={loanData}  Lnk2={true} link1={'/loan_emi_details'} />
            <br /><br />
            <h3 className='uni_heading'>Increment History</h3>
            <MainTable headings={incrementTableHeadings} keys={incrementTableKeys} data={IncrementData} />

            <br /><br />
            <h3 className='uni_heading'>Salary History</h3>
            <MainTable headings={salaryTableHeading} keys={salaryTableKeys} data={salaryData} />
        </React.Fragment>
    )
}

export default EmployeeProfile