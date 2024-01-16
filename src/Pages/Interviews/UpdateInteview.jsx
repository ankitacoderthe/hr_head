import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../../util'
import AdditionalInfoContainer from '../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import MainTable from '../../Components/MainTable/MainTable'
import classes from "./Interview.module.css"
const UpdateInterview = () => {
 
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const {id}=useParams()
    const [isPending,setIsPending]=useState(false)

    const [interviewData, setInterviewData] = useState([])
  const [documentsData,setDocumentsData]=useState([])
const headers = { "Authorization": "Bearer " + token }
useEffect(()=>{
axios.get(url+"api/getInterview?id="+id,{headers}).then((response)=>{
    setInterviewData([{
        title: "Name",
        value: response.data[0].name
      }, {
        title: 'Hired By',
        value: response.data[0].hired_by
      }, {
        title: 'Department Name',
        value: response.data[0].department_name
      }, {
        title: 'Father Name',
        value:response.data[0].fathers_name

      }, {
        title: 'Date Time',
        value: response.data[0].date_time.split(" ")[0].split("-").reverse().join("-")

      }, {
        title: 'Experience',
        value: response.data[0].experience
      }, {
        title: 'Role Name',
        value: response.data[0].role_name
      },{
        title: 'Expected Salary',
        value: response.data[0].expected_salary
      }])
      let array=[]
      response.data.forEach((data)=>{
        array.push({document_name:data.document_name,document:data.document_name})
      })
      setDocumentsData(array)
      setIsPending(response.data[0].status==='Pending'?true:false)
})
},[])
   const tableHeadings=["Document Name","Link"]
const tableKeys=['document_name','document']
      function makePermanent(event){
        event.preventDefault()
        axios.patch(url+'api/updateInterview/'+id,{
            status:"Permanent"
        },{headers}).then((response)=>{
    if(response){
        navigate('/add_employee/'+id)
    }
        })
    }
    function reject(event){
      event.preventDefault()
        axios.patch(url+'api/updateInterview/'+id,{
            status:"Reject"
        },{headers}).then((response)=>{
    if(response){
        navigate(-1)
    }
        })
    }
    function makeTrial(event){
      event.preventDefault()
        axios.patch(url+'api/updateInterview/'+id,{
            status:"Trial"
        },{headers}).then((response)=>{
    if(response){
        navigate('/add_employee/'+id)
    }
        })
    }

  


    return (
      
       <React.Fragment>
      <Heading heading={'Interview Details'} />
      <div className='uni_container'>
                <h3 className='uni_heading'>Interview Information</h3>
                <AdditionalInfoContainer data={interviewData} />
            </div>
            <h3 className='uni_heading'>Interview Documents</h3>
      <MainTable type='button' headings={tableHeadings} keys={tableKeys} data={documentsData} height={true} />
      {isPending&&<div className={classes.btn_container}>
                    <button className={classes.button}  onClick={(event) => reject(event)}>Reject</button>
                    <button  className={classes.button}  onClick={(event) => makePermanent(event)}>Make Permanent</button>
                    <button  className={classes.button} onClick={(event) => makeTrial(event)}>Trial</button>
                </div>}

    </React.Fragment>
           

        
    )
}

export default  UpdateInterview 
