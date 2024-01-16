import React,{useState,useEffect} from 'react'
import classes from './EmployeeActualProfile.module.css'
import Img from '../../../assets/dp.png'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'

import axios from 'axios'
import { Route, useParams } from 'react-router-dom'
import moment from 'moment'
import { url } from '../../../util'
import Cookies from 'universal-cookie'
const EmployeeActualProfile = () => {
  const cookies = new Cookies();
  const {id}=useParams()
 const[employeeData,setEmployeeData] =useState([])
 const[employeeGrade,setEmployeeGrade]=useState(0)
 useEffect(()=>{ const token = cookies.get('hr_head_token')
 const headers={"Authorization":"Bearer "+token}
  axios.get(url+"api/getEmployeeDetails?id="+id,{headers}).then((response)=>{
    
  setEmployeeData(response.data.employeesResult[0])
 
  
    let from_date=moment().subtract(1,'month').startOf('month').format("YYYY-MM-DD")
    let to_date=moment().subtract(1,'month').endOf('month').format("YYYY-MM-DD")
      axios.get(url+"api/getGradeByEmployeeID?employee_id="+id+"&from_date="+from_date+"&to_date="+to_date+"&commission=3000",{headers}).then((response)=>{
     
      if(response.data.length>0&response.data[0].Total!==null){

          setEmployeeGrade(response.data[0].Total/10)
        }
        
    })  
    
   
})


 },[])
  return (
    <div className={classes.container}>
      <div className={classes.top_container}>
          <img src={url+employeeData?.photo} alt="dp_img" />
          <div className={classes.black_div}>{employeeData?.name}</div>
          <div className={classes.gray_div}><span>{employeeData?.role_name}</span> | <span>{employeeData?.floor_name}</span></div>
          <div className={classes.black_div}>Emp Id-{employeeData?.empID}</div>
      </div>
      <div className={classes.middle_container}>
        <h5 className={classes.theme_heading}>Employee Grade</h5>
        <div className={classes.grade}>{employeeGrade}/10</div>
      </div>
      <div className={classes.middle_container}>
        <h5 className={classes.theme_heading}>Contact Details</h5>
       <DetailsDiv cls2={true} num={1} title={'Phone No.'} value={employeeData?.phone} />
       <DetailsDiv cls2={true} num={2} title={'Email Id'} value={employeeData?.email_address} />
       <DetailsDiv cls2={true} num={3} title={'Emergency No.'} value={employeeData.emergency_number} />
      </div>
    </div>
  )
}

export default EmployeeActualProfile