import React,{useState} from 'react'
import Heading from '../../Components/Heading/Heading'
import classes from './UploadAttendance.module.css'
import InpFile from '../../Components/InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { url } from '../../util'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const UploadAttendance = () => {
const cookie=new Cookies()
const navigate=useNavigate()
const [documentFile, setDocumentFile] = useState(null)
const [fileLabel,setFileLabel] = useState('')

const newFile = (data) => {
    console.log('data in side modal', data)
    setDocumentFile(data)
}
    const clickHandler = (e) => {
        
       
            const filename = 'attendance.csv';
            const fileUrl = "./attendance.csv";
          
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = filename;
          
            // Append the link to the document
            document.body.appendChild(link);
          
            // Trigger a click on the link to start the download after a short delay
            
              link.click();
          
              // Remove the link from the document after another delay
              
                document.body.removeChild(link);
            
        

    }
const uploadAttendance=(e,data)=>{
    e.preventDefault()
const token=cookie.get('hr_head_token')
const headers = { "Authorization": "Bearer " + token,'Content-Type': 'multipart/form-data'}

    axios.post(url+"api/upload-attendance",{
        file:documentFile 
     },{headers}).then((response)=>{
     
        if(response.status===200){
         toast.success(response.data)
         setTimeout(()=>{
             navigate("/")
         },[3000])
        }
        }).catch ((error)=> {
    console.log(error)
    toast.error(error.response.data)
})

  

}
  return (
    <React.Fragment>
<Heading heading={'Upload Attendance'} BtnFunc={clickHandler} BtnFuncName={'Download Sample'} />
<ToastContainer></ToastContainer>
<div className={classes.instructions}>
    <ol className={classes.ul}>
        <li>Upload a CSV (Comma-Separated Values) file. Ensure that your file has the ".csv" extension.</li>
        <li>Inside the CSV file, the date and time format must be in the following format: "YYYY-MM-DD HH:mm:ss".</li>
        <li>The time in the file should be in 24-hour format. For example, 15:30:00 represents 3:30 PM.</li>
        <li>Before uploading, double-check the contents of your CSV file to ensure that the date and time values adhere to the specified format. Any deviations may result in errors during the upload process. Additionally, ensure that the CSV file contains valid and complete data for other required fields.</li>
    </ol>
</div>
<form className={classes.form} onSubmit={uploadAttendance}>
    <InpFile label={fileLabel} labelFunc={setFileLabel} fileHandler={newFile} id={1} />
    <button type='submit'>Upload</button>
</form>
    </React.Fragment>
  )
}

export default UploadAttendance