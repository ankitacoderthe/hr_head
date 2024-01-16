import React, { useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import InpFile from '../../Components/InpFile/InpFile'
import classes from './AddEmployee.module.css'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'
import { toast } from 'react-toastify'
import RenderCard from '../../Components/RenderCard/RenderCard'
import { url } from '../../util'
const baseURL=url
const selectData = [
  {
    id: 1,
    name: 'Trial'
  },
  {
    id: 2,
    name: 'Permanent'
  },
]
const selectData2 = [
  {
    id: 1,
    name: 'PF'
  },
  {
    id: 2,
    name: 'Cash'
  },
]
const AddEmployee_form3 = (props) => {
  const [arr, setArr] = useState([])
  const [fileLabel, setFileLabel] = useState([])
  const increaseFile = () => {
    const newFileInput = {
      id: arr.length + 1,
    };
    setArr(prevInputs => [...prevInputs, newFileInput]);
  }
  const newLabel = (data, index) => {
    console.log(index)
    var array = fileLabel
    array[index] = data
    setFileLabel([...array])
  }
console.log(arr,fileLabel)
  const delFile = (index) => {
    if(props.isEdit){
      const newArr = arr.filter(item => item.id !== index+1)
      var array = fileLabel.filter((item,indexArr) => indexArr!== index)
      setFileLabel([...array])
      setArr(newArr)
    }
    else{
      const newArr = arr.filter(item => item.id !== index-2)
      var array = fileLabel.filter((item,indexArr) => indexArr!== index)
      setFileLabel([...array])
      setArr(newArr)
    }
    }
  return (
    <React.Fragment>
      <LabeledSelect required={true} title={'Fine Management'} select_id='fine_management' data={[{ 'name': 'Yes' }, { 'name': 'No' }]} cls={true} selectedVal={(data) => props.changeFineMgmt(data)} value={props.fine_mgmt} />
      {props.formInput.map((element, index) => (
        <LabeledInput disabled={element.disabled} required={element.required} key={index} cls={element.show?'wd50':'invisible'} img={false} title={element.title} value={element.value} func2={(data) => element.function(data)} type={element.type ? element.type : 'text'} id={element.title} />
      ))}
      <LabeledSelect required={true} title={'Employee Type'} select_id='emp_type' data={selectData} cls={true} selectedVal={props.chanageEmpType} value={props.emp_type} />
      <LabeledSelect required={true} title={'Mode of Pay'} select_id='mode' data={selectData2} cls={true} selectedVal={props.changeModeOfPay} value={props.mode_of_pay} />
      <div className={classes.inp_con}>
        <div className={classes.rendercard_container}>
          {props.photo ?
            <RenderCard id={'f1-img'} title={'Profile Photo'} href={!props.isPhotoChanged?baseURL + props.photo:props.photo} func={props.changePhoto} isPhoto={true}/>
            : null}
          {props.data.map((element, index) => {
            return (
              <RenderCard id={`fi-${index + 1}`} title={element.name.split('-')[1]} href={baseURL + element.name}func={(data)=>props.changeDocument(data,index+1)} />
            )
          })}
        </div>
        {!props.isEdit&&
        <div>
         <div className={classes.file_div}>
         <h5 >Upload Photo (JPG Files Only)</h5>
         <InpFile id={1} required={true} label={fileLabel[0]} labelFunc={(data) => newLabel(data, 0)} fileHandler={(data) => props.newFile(data, 0)} accept={'image/jpeg'} />
     </div>
     <div className={classes.file_div}>
         <h5 >Upload Pan Card (Pdf Files Only)</h5>
         <InpFile required={true} label={fileLabel[1]} id={2} labelFunc={(data) => newLabel(data, 1)} fileHandler={(data) => props.newFile(data, 1)} accept={'application/pdf'} />
     </div>
     <div className={classes.file_div}>
         <h5 >Upload Aadhar Card (Pdf Files Only)</h5>
         <InpFile required={true} label={fileLabel[2]} id={3} labelFunc={(data) => newLabel(data, 2)} fileHandler={(data) => props.newFile(data, 2)} accept={'application/pdf'} />
     </div>
     </div>
}
{
   !props.isEdit&&arr.map((element, index) => (
    <div className={classes.file_div}>
        <h5 >Upload Additional Document {index+3}   (Pdf Files Only)</h5>
        <InpFile required={true} label={fileLabel[index+3]} id={index + 4} labelFunc={(data) => newLabel(data, index + 3)} accept={'application/pdf'} fileHandler={(data) => props.newFile(data, index + 3)} rmv={true} rmvFunc={delFile} />
    </div>
))
}
        {props.isEdit&&arr.map((element,index) => {
          return <div className={classes.file_div} key={element.id} >
            <h5 >Upload Additional  Document {index+1+props.data.length}     (Pdf Files Only)</h5>
            <InpFile label={fileLabel[index]} key={index} labelFunc={(data) => newLabel(data,index)} accept={'application/pdf'} fileHandler={(data) =>  props.newFile(data, index+props.data.length+1)} id={element.id} rmv={true} rmvFunc={delFile} />
          </div>
        })}
      </div>
      <div>
        <button type="button" className={classes.add_inp} onClick={increaseFile}>Add File</button>
      </div>
    </React.Fragment>
  )
}
export default AddEmployee_form3