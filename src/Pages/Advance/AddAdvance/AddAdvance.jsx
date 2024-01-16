import classes from './AddAdvance.module.css'
import React, { useState, useEffect } from 'react'
import InpFile from '../../../Components/InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import Heading from '../../../Components/Heading/Heading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../util'
const AddAdvanceModal = (props) => {
    const [isLoading,setIsloading]=useState(false)
    const url=baseURL
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const [employeeSalary,setEmployeeSalary]=useState(null)

    const [searchtext, setSearchText] = useState('')
    const [advance, setAdvance] = useState(null)
    const [approval_head, setApprovalHead] = useState(false)
    const [recall_head, setRecallHead] = useState(false)
    const [document, setDocument] = useState(null)
    const [fileLabel, setFileLabel] = useState('')
    const [noData, setNoData] = useState(true)
    const [employee_id, setEmployeeId] = useState(null)
    const [employee_data, setEmployeeData] = useState([])
    const navigate = useNavigate()
    const cancel = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    const searchHandler = (data) => {
        setSearchText(data)
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getEmployeeDetails?employee_query=" + data, { headers }).then((response) => {
           
            if (response.data.employeesResult!==undefined) {

                setEmployeeId(response.data.employeesResult[0].id)
                setEmployeeData([
                    {
                        title: "Name",
                        value: response.data.employeesResult[0].name
                    },
                    {
                        title: "Employee ID",
                        value: response.data.employeesResult[0].empID
                    },
                    {
                        title: 'SuperVisor Name',
                        value: response.data.headEmployeesResult[0]?.head_employee_name
                    }, {
                        title: 'Designation',
                        value: response.data.employeesResult[0].role_name
                    }, , {
                        title: 'Department',
                        value: response.data.employeesResult[0].department_name
                    }, {
                        title: 'Floor Name',
                        value: response.data.employeesResult[0].floor_name

                    }, {
                        title: 'Gender',
                        value: response.data.employeesResult[0].gender

                    }, {
                        title: 'location name',
                        value: response.data.employeesResult[0].location_name
                    }, {
                        title: 'location Department',
                        value: response.data.employeesResult[0].store_department_name
                    }
                ])
                setNoData(false)
            }
            else {
                setNoData(true)
            }
        })
    }
    const newLabel = (data) => {
        setFileLabel(data.target.value)
    }

    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }

    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }


    function add(e) {
        e.preventDefault();

        // console.log(document);

        const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
        let requiredFields = []
        if (employee_id === null) {
            toast.error("Employee must be present")
        }
        else {
            setIsloading(true)
            axios.post(url + "api/addAdvance", {
                employee_id: employee_id,
                date: moment().format("YYYY-MM-DD"),
                amount: advance,
                download: document,
                recall_head: recall_head,
                head_approval: approval_head
            }, { headers }).then((response) => {
                if (response) {
                    toast.success('Advance Added Successfully!')
                    setAdvance('')
                    setDocument('')
                    setRecallHead('')
                    setApprovalHead('')
                    setFileLabel('')
                    cancel()
                }
            })
        }

    }



    return (
        <React.Fragment>
            <Heading heading={'Add Advance'} />
            <ToastContainer></ToastContainer>
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
            <form className={classes.form} onSubmit={add}>
                <LabeledInput id={'advance'} title={'Advance'} img={false} func2={setAdvance} required={true} />

                <div className={classes.form_input_div}>
                    <label htmlFor="abh">Approve By Head</label>
                    <select id='abh' onChange={(e) => setApprovalHead(e.target.value)} required={true} >
                        <option selected={approval_head === true} value={true}>Yes</option>
                        <option selected={approval_head === false} value={false}>No</option>
                    </select>
                </div>
                <div className={`${classes.rh_div} ${classes.form_input_div}`} value={recall_head} >
                    <label htmlFor='rh'>Recall Head</label>
                    <input type="checkbox" id='rh' onChange={recallHandler} />
                </div>
                <br />
                <br />
                <div className={classes.file_con}>
                    <h3 className={classes.file_con_label}>Attach File</h3>
                    <InpFile label={fileLabel} labelFunc={setFileLabel} fileHandler={newFile} required={true} id={1} />
                </div>
                
                <div className={classes.btn_container}>

                    <button type="button" className={classes.cancel} onClick={(event) => cancel(event)}>Cancel</button>
                    <button type={'submit'} disabled={isLoading} className={classes.accept} >Add Advance</button>
                </div>
            </form>


        </React.Fragment>

    )
}

export default AddAdvanceModal