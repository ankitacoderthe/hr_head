import React from 'react'
import classes from './SalaryCertificate.module.css'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LabeledSelect from '../../../Components/LabeledSelect/LabeledSelect'
import { baseURL } from '../../../util'
const SalaryCertificate = () => {
    const{id}=useParams()
const [inputs,setInputs]=useState([])
const [month,setMonth]=useState(null)
const [year,setYear]=useState(null)
const [purpose,setPurpose]=useState(null)
const url = baseURL
const cookies = new Cookies();
const token = cookies.get('hr_head_token')
        const headers = { "Authorization": "Bearer " + token }
        useEffect(()=>{
            axios.get(url+"api/getEmployeeDetails?id="+id,{headers:headers}).then((response)=>{
        
                setInputs([
                 {
                     title: 'Emp Id',
                     id: 'emp_id',
                     ph: response.data.employeesResult[0].empID,
                     disabled:true
                 },
                 {
                     title: 'Name',
                     id: 'name',
                     ph: response.data.employeesResult[0].name,
                     disabled:true
                 },
                 {
                     title: 'Floor',
                     id: 'floor',
                     ph: response.data.employeesResult[0].floor_name,
                     disabled:true
                 },
                 {
                     title: 'location',
                     id: 'location',
                     ph: response.data.employeesResult[0].location_name,
                     disabled:true
                 },
                 {
                     title: 'Designation',
                     id: 'designation',
                     ph: response.data.employeesResult[0].role_name,
                     disabled:true
                 },
                 
                 {
                     title: 'Year',
                     id: 'year',
                     ph: year,
                     disabled:false,
                     func2:setYear
        
                 },
                 {
                    title: 'Purpose',
                    id: 'purpose',
                    ph: purpose,
                    disabled:false,
                    func2:setPurpose
       
                },
             ]) 
            })
        },[])
   
const navigate=useNavigate()
const makeCertificate=(e)=>{
    e.preventDefault()
    navigate("/salary_certi/"+month+"/"+year+"/"+purpose+"/"+id)
}
let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  monthArray=monthArray.map((element,index)=>{return {id:index,name:element}})

return (
        <React.Fragment>
            <Heading heading='Make a Salary Certificate' />
            <br />
            <form onSubmit={makeCertificate}>
            <div className={classes.inner_container}>
                {inputs.map((element, index) => (
                    <LabeledInput disabled={element.disabled} key={index} title={element.title} id={element.id} ph={element.ph} func2={element?.func2}  cls={true} img={false} />
                ))
                }
                 <LabeledSelect  cls={'wd50'} required={true}  selectedVal={setMonth} usingid={true} value={month} img={false} title={'Month'} id={'month'} data={monthArray} />
            </div>
            <br />
            <div className={classes.btn_container}>
                    <button className={classes.cancel} onClick={()=>navigate(-1)}>Back</button>
                    <button type={'submit'} className={classes.accept} >Make a Salary Certificate</button>
                    {/* <button  className={classes.accept} onClick={incNum} >Continue</button> */}
                </div>
            
            </form>
        </React.Fragment>
    )
}

export default SalaryCertificate