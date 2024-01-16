import React, { useState, useEffect } from 'react'

import moment from 'moment'
import Cookies from 'universal-cookie'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import classes from './AddFine.module.css'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import InpFile from '../../../Components/InpFile/InpFile'
import axios from 'axios'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useHttp from '../../../Hooks/use-http'
import { baseURL } from '../../../util'
const AddLoan = () => {
    const url=baseURL
    const navigate = useNavigate()
    const Location = useLocation()
  
    const [employee_data, setEmployeeData] = useState([])
    const [fileLabel, setFileLabel] = useState('')
    const [fine, setFine] = useState(null)
    const [text, setText] = useState(null)
    const [searchtext, setSearchText] = useState('')
    const [fieldValues, setFieldValues] = useState([]);
    const [noData, setNoData] = useState(true)
    const [employee_id, setEmployeeId] = useState(null)
    const cookies = new Cookies()
    const token = cookies.get('hr_head_token')
    const [recall_head, setRecallHead] = useState(false)
    const [approvalHead, setApprovalHead] = useState(false)
    console.log(fieldValues)
    const searchHandler = (data) => {
setSearchText(data)
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getEmployeeDetails?employee_query=" + data, { headers }).then((response) => {
            if (response.data.employeesResult!==undefined) {
if(response.data.employeesResult[0].fine_management===1){
    setEmployeeId(response.data.employeesResult[0].id)
    setEmployeeData([
        {
            title:"Name",
            value:response.data.employeesResult[0].name
          },
        {
            title:"Employee ID",
            value:response.data.employeesResult[0].empID
          },
          {
      title:'SuperVisor Name',
      value:response.data.headEmployeesResult[0]?.head_employee_name
          },{
            title:'Designation',
      value:response.data.employeesResult[0].role_name
          },,{
            title:'Department',
      value:response.data.employeesResult[0].department_name
          },{
            title:'Floor Name',
      value:response.data.employeesResult[0].floor_name
      
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
else{
   toast.error("User can not be given fine") //toastify
}
          
   
}
else{
setNoData(true)
}
        })
    }

    function cancel(e) {
        e.preventDefault()
        setEmployeeData([])
        setSearchText('')
        setNoData(false)
        navigate(-1)
    }
    const formData = {
        employee_id: employee_id,
        amount: fine,
        reason: text
    }
    const reqConfig = {
        url: url+'api/addFine',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    }
    const { isLoading, sendRequest } = useHttp()

    const formHandler = (e) => {
        e.preventDefault()
       
        if(employee_id===null){  
            toast.error("Employee Must Be Present")
    }
        
        
        else{
        sendRequest(reqConfig)
        toast.success('Fine Added')
        setTimeout(() => {
            cancel()
        }, 1000);
        setText('')
        setEmployeeData([])
        }
           
            
       
    }





    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }
    return (
        <React.Fragment>
            <Heading heading={'Add Fine'} />
            <ToastContainer></ToastContainer>
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
            <form className={classes.form} onSubmit={formHandler}>

                {/* <div className={classes.form_input_div}>
                    Fine<span><input type="text" value={fine} onChange={e => setFine(e.target.value)} /></span>
                </div> */}
                <LabeledInput title={'Fine'} id={'fine'} img={false} type={'number'} func2={setFine} required={true}/>
                <div className={classes.form_input_div}>
                    <label htmlFor="abh">Approve By Head</label>
                    <select id='abh' onChange={(e) => setApprovalHead(e.target.value)} required={true}>
                        <option selected={approvalHead === true} value={true}>Yes</option>
                        <option selected={approvalHead === false} value={false}>No</option>
                    </select>
                </div>
                <div className={`${classes.form_input_div} ${classes.w100}`} >
                    <label id='text'>Reason</label>
                    <textarea id='text' required={true} onChange={e => setText(e.target.value)} value={text} placeholder='Type Here...'></textarea>
                </div>
                
                <div className={`${classes.form_input_div} ${classes.flex}`} style={{alignItems:"center",height:'25px'}} value={recall_head} >
                    <label htmlFor="recall_head">Recall Head</label>
                    <input id='recall_head' type="checkbox" onChange={recallHandler} />
                </div>


                <div className={classes.btn_container}>
      
      <button type="button" className={classes.cancel} onClick={(event)=> cancel(event)  }>Cancel</button>
      <button type={'submit'} disabled={isLoading} className={classes.accept} >Add Fine</button>
    </div>

            </form>
          
        </React.Fragment>
    )
}

export default AddLoan