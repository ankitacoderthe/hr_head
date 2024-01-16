import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './AddInterview.module.css'
import axios from 'axios'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Cookies from 'universal-cookie'
import Img from '../../../assets/shop.png'
import { useNavigate } from 'react-router-dom'
import LabeledSelect from '../../../Components/LabeledSelect/LabeledSelect'
import InpFile from '../../../Components/InpFile/InpFile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../util'
const AddInterview = () => {
    const [isLoading,setIsloading]=useState(false)
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const [name, setName] = useState(null)
    const [father_name, setfatherName] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [hired_by, setHiredBy] = useState(null)
    const [reference, setReference] = useState(null)

    const [interviewData, setInterviewData] = useState([])
    const [interviewDate, setInterviewDate] = useState(null)
    const [interviewer, setInterviewer] = useState(null)
    const [salary, setSalary] = useState(null)
    const [dept, setDept] = useState(null)
    const [exp, setExp] = useState(null)
    const [remarks, setRemarks] = useState(null)
    const [fileLabel, setFileLabel] = useState([])
    const [download, setDownload] = useState([])
    const [employeeData, setEmployeeData] = useState([])
    const [roleData, setRoleData] = useState([])
    const [deptData, setDeptData] = useState([])



    const [arr, setArr] = useState([])
    const newLabel = (data, index) => {
        console.log(index)
        var array = fileLabel
        array[index] = data
        setFileLabel([...array])
    
      }
    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }
        
            axios.get(baseURL + "api/getEmployeesBasedOnRole?role_name=Hr Head" , { headers }).then((response) => {
                setInterviewData(response.data)
            })
        
    }, [])
    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }


        axios.get(baseURL + "api/getAllEmployees", { headers }).then((response) => {
            setEmployeeData(response.data)
        })
        axios.get(baseURL + "api/getRoles", { headers }).then((response) => {
            response.data = response.data.filter((data) => data.name !== 'Super Admin' && data.name !== 'Admin')
            response.data = response.data.filter((data, index, self) => {
                let indexOne = self.findIndex((dataOne) => dataOne.name === data.name)
                if (indexOne === index) {
                    return data
                }
            })

            setRoleData(response.data)
        })
        axios.get(baseURL + "api/getDepartments", { headers }).then((response) => {
            setDeptData(response.data)
        })
    }, [])

    const inputs = [
        {
            title: 'Name',
            id: 'name',
            ph: '',
            func2: setName
        },
        {
            title: 'Father Name',
            id: 'father_name',
            ph: '',
            func2: setfatherName
        },
        {
            title: 'Designation Interview For',
            id: 'designation_interview_for',
            ph: '',
            func2: setDesignation
        },
        {
            title: 'Hired By',
            id: 'hired_by',
            ph: '',
            func2: setHiredBy
        },
        {
            title: 'Reference',
            id: 'reference',
            ph: '',
            func2: setReference

        },
        {
            title: 'Interview Date',
            id: 'interview_date',
            ph: '',
            func2: setInterviewDate,
            type: 'date'
        },
        {
            title: 'Interviewer Name',
            id: 'interviewer name',
            ph: '',
            func2: setInterviewer
        },
        {
            title: 'Salary Expectation',
            id: 'salary_expectation',
            ph: '',
            func2: setSalary
        },
        {
            title: 'Department',
            id: 'department',
            ph: '',
            func2: setDept
        },
        {
            title: 'Experience',
            id: 'experience',
            ph: '',
            func2: setExp
        },
    ]
    function add(e) {
        e.preventDefault()

        let obj = {}
        obj.download = []
        download.forEach((data) => {
            obj.download.push(data)
        })
        const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
        setIsloading(true)
        axios.post(baseURL + "api/addInterview", {
            "fileLength": obj.download.length,
            "download": obj.download,
            "name": name,
            "interviewer_employee_id": interviewer,
            "expected_salary": salary,
            "fathers_name": father_name,
            "experience": exp,
            "remarks": remarks,
            "designation_id": designation,
            "reference_id": reference,
            "date_time": interviewDate,
            "department_id": dept,
            "hired_by_employee_id": hired_by


        }, { headers }).then((response) => {
            if (response.status === 200) {
                setName('')
                setDept('')
                setDesignation('')
                setExp('')
                setfatherName('')
                setHiredBy('')
                setInterviewDate('')
                setInterviewer('')
                setReference('')
                setRemarks('')
                setSalary('')
                toast.success('Interview Added!')
                setTimeout(() => {
                    cancel()
                }, 1000);
            }
        })

    }
    function cancel(e) {
        e.preventDefault()
        navigate(-1)
    }
    const newFile = (data, index) => {
        var array = download
        array[index] = data
        setDownload(array)
        console.log(download)

    }

    const increaseFile = () => {
        const newFileInput = {
            id: arr.length + 3,
        };

        setArr(prevInputs => [...prevInputs, newFileInput]);
    }

    
  const delFile = (index) => {
    console.log(index)
    const newArr = arr.filter(item => item.id !== index+1)
    newLabel(null,index)
    setArr(newArr)
  }


    return (
        <React.Fragment>
            <Heading heading={'Add Interview'} />
            <ToastContainer></ToastContainer>
            <form className={classes.container} onSubmit={add}>
                {inputs.map((element, index) => {
                    return element.title !== 'Interviewer Name' && element.title !== 'Reference' & element.title !== 'Designation Interview For' & element.title !== 'Hired By' && element.title !== 'Department' && element.title !== 'Interview Date' ? <LabeledInput required={true} func2={element.func2} title={element.title} id={element.id} key={index} cls={true} img={false} /> : element.title !== 'Reference' && element.title !== 'Designation Interview For' && element.title !== 'Hired By' && element.title !== 'Department' && element.title !== 'Interview Date' ? <LabeledSelect required={true} usingid={true} cls={true} mr={true} selectedVal={element.func2} img={Img} select_id='interviewer' title={'Interviewer'} data={interviewData} /> : element.title !== 'Designation Interview For' && element.title !== 'Hired By' && element.title !== 'Department' && element.title !== 'Interview Date' ? <LabeledSelect usingid={true} cls={true} mr={true} selectedVal={element.func2} img={Img} select_id='reference' title={'Reference'} data={employeeData} /> : element.title !== 'Hired By' && element.title !== 'Department' && element.title !== 'Interview Date' ?

                        <LabeledSelect required={true} cls={true} mr={true} usingid={true} selectedVal={element.func2} select_id='designation_interview_for' title={'Designation Interview For'} data={roleData} />
                        //  <select onChange={(e) => element.func2(e.target.value)} id='designation_interview_for' placeholder={'Designation Interview For'}  > {roleData.map((val, index) => (
                        //     <option key={index} value={val.id}>{val.role_name}</option>
                        // ))}</select> 

                        : element.title !== 'Department' && element.title !== 'Interview Date' ? <LabeledSelect required={true} usingid={true} cls={true} mr={true} selectedVal={element.func2} img={Img} select_id='hired_by' title={'Hired By'} data={interviewData} /> : element.title !== 'Interview Date' ? <LabeledSelect required={true} cls={true} mr={true} selectedVal={element.func2} img={Img} select_id='department' title={'Department'} data={deptData} usingid={true} /> :
                            <LabeledInput required={true} func2={element.func2} title={element.title} id={element.id} key={index} cls={true} img={false} type={element.type} />
                }


                )}
                <div className={classes.input_div}>
                    <label htmlFor="remarks">Remarks</label>
                    <textarea id="remarks" onChange={(e) => setRemarks(e.target.value)} required={true} ></textarea>
                </div>

                <div className={classes.file_div}>
                    <h5 >Upload Document 1</h5>
                    <InpFile id={0} required={true} label={fileLabel[0]} labelFunc={(data) => newLabel(data, 0)} fileHandler={(data) => newFile(data, 0)} />
                </div>
                <div className={classes.file_div}>
                    <h5 >Upload Document 2</h5>
                    <InpFile required={true} label={fileLabel[1]} id={1} labelFunc={(data) => newLabel(data, 1)} fileHandler={(data) => newFile(data, 1)} />
                </div>
                <div className={classes.inp_con}>
                    {arr.map((element, index) => (
                        <div className={classes.file_div}>
                            <h5 >Upload Additional Document {element.id}</h5>
                            <InpFile required={true} label={fileLabel[index + 2]} id={index + 3} labelFunc={(data) => newLabel(data, index + 2)} fileHandler={(data) => newFile(data, index + 2)} rmv={true} rmvFunc={delFile} />
                        </div>
                    ))}
                </div>
             <div>
             <button type='button' className={classes.add_inp} onClick={increaseFile}>Add File</button>
             </div>
                {/* <div className={classes.input_div}>
                    <label htmlFor="file">Attach File</label>
                    <input type="file" id='file' />
                </div> */}
                <div className={classes.btn_container}>
                    <button type="button" className={classes.cancel} onClick={(event) => cancel(event)}>Cancel</button>
                    <button type={'submit'} disabled={isLoading} className={classes.accept} >Add Interview</button>
                </div>
            </form>

        </React.Fragment>
    )
}

export default AddInterview