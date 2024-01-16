import React,{useState} from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'
const AddEmployee_form1 = (props) => {
  const [name,setName]=useState(null)
    const [father_name,setFatherName]=useState(null)
    const [aadhar_no,setAadharNo]=useState(null)
    const [pan_no,setPanNo]=useState(null)
    const [permanent_address,setPermamanentAddress]=useState(null)
    const [local_address,setLocalAddress]=useState(null)
    const [emergency_mobile_no,setEmergencyMobileNumber]=useState(null)
    const [mobile_no,setMobileNo]=useState(null)
    const [dob,setDOB]=useState(null)
    const [marital_status,setMaritalStatus]=useState(null)
  return (
    <React.Fragment>
      
      {props.formData.map((element,index)=>(
        <LabeledInput required={true} key={index} splKey={element.splKey!==undefined?element.splKey:null} cls={'wd50'} img={false} title={element.title} value={element.value} func2={(data)=>element.function(data)} type={element.type ? element.type :'text'} id={element.title} />
      ))}
      <LabeledSelect required={true} cls={'wd50'}  selectedVal={props.changeMaritalStatus} value={props.marital_status} img={false} title={'Marital Status'} id={'marital_status'} data={[{name:'Single'},{name:'Married'},{name:'Divorce'},{name:'Widow'}]}   /> 
      <LabeledSelect required={true} cls={'wd50'}  selectedVal={props.changeGender} value={props.genderValue} img={false} title={'Gender'} id={'gender'} data={[{name:'Male'},{name:'Female'}]}   /> 
    </React.Fragment>
  )
}

export default AddEmployee_form1