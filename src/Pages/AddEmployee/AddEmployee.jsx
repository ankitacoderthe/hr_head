import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import StepBar from '../../Components/StepBar/StepBar'
import AddEmployee_form1 from './AddEmployee_form1'
import AddEmployee_form2 from './AddEmployee_form2'
import AddEmployee_form3 from './AddEmployee_form3'
import classes from './AddEmployee.module.css'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../../util'

const AddEmployee = () => {
    const [isLoading,setIsloading]=useState(false)
    const baseURL=url
    const [isShow,setIsShow]=useState(false)
    const [isPhotoChanged, setIsPhotoChanged] = useState(false)
    const [isIdExist, setIdExist] = useState(false)
    const [empId, setEmpId] = useState(null)
    const parameter = useParams()
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
    const [photo, setPhoto] = useState(null)
    const [data, setData] = useState([])
    const [roleData, setRoleData] = useState([])
    const [headEmployeeData, setHeadEmployeeData] = useState([])
    const [bankdetailsDisabled, setBankDetailsDisabled] = useState(false)
    const [supervisorData, setSupervisorData] = useState([])
    const [locationOptions,setLocationOptions]=useState([])
    const [username,setUserName]=useState(null)
    const [password,setPassword]=useState(null)
    const [isLogin,setIsLogin]=useState(false)
    const [email,setEmail]=useState(null)
    const getEmpData = async (EmpId) => {
        try {
            const response = await fetch(`${baseURL}api/getEmployeeDetails?id=${EmpId}`, {
                method: 'GET',
                headers: {
                    ...headers
                }
            })
            if (!response.ok) {
                throw new Error('Something is wrong!')
            }
            const result = await response.json()
            console.log(result)
            setName(result?.employeesResult[0]?.name)
            setFatherName(result?.employeesResult[0]?.father_name)
            setAadharNo(result?.employeesResult[0]?.aadhar_no)
            setPanNo(result?.employeesResult[0]?.pan_no)
            setPermamanentAddress(result?.employeesResult[0]?.permanent_address)
            setLocalAddress(result?.employeesResult[0]?.local_address)
            setEmergencyMobileNumber(result?.employeesResult[0]?.emergency_number)
            setMobileNo(result?.employeesResult[0]?.phone)
            setGender(result?.employeesResult[0]?.gender)
            setMaritalStatus(result?.employeesResult[0]?.marital_status)
            result.employeesResult[0].dob = result?.employeesResult[0]?.dob.split(" ")[0]
            setDOB(result?.employeesResult[0]?.dob)
            setDesignation(result?.employeesResult[0]?.role_id)
            setDepartment(result?.employeesResult[0]?.department_id)
            setSection(result?.employeesResult[0]?.store_department_id)
            setlocation(result?.employeesResult[0]?.location_id)
            setFloor(result?.employeesResult[0]?.floor_id)
            setHiredBy(result?.employeesResult[0]?.hired_by_employee_id)
            setHeadEmployee(result?.employeesResult[0]?.head_employee_id)
            setSupervisor(result?.employeesResult[0]?.supervisor_id)
            setHiringFrom(result?.employeesResult[0]?.lead_from)
            result.employeesResult[0].hiring_date_time = result?.employeesResult[0]?.hiring_date_time.split(" ")[0]
            setLeadDate(result?.employeesResult[0]?.hiring_date_time)
            setESI(result?.employeesResult[0]?.esi_no)
            setEpf(result?.employeesResult[0]?.epf_no)
            setFineMgmt(result?.employeesResult[0]?.fine_management === 1 ? 'Yes' : 'No')
            setBankName(result?.employeesResult[0]?.bank_name)
            setBranch(result?.employeesResult[0]?.branch)
            setIFSC(result?.employeesResult[0]?.ifsc)
            setAcountNo(result?.employeesResult[0]?.account_number)
            setMinWages(result?.employeesResult[0]?.min_wages_as_per_rule)
            setBaseSalary(result?.employeesResult[0]?.amount)
            setUAN(result?.employeesResult[0]?.uan_no)
            setModeOfPay(result?.employeesResult[0]?.sub_type)
            setEmpType(result?.employeesResult[0]?.type)
            setQualification(result?.employeesResult[0]?.qualification)
            setEmail(result?.employeesResult[0]?.email_address)
            result.documentResult.forEach((data) => {
                data.isFileChanged = false
            })
            setData(result?.documentResult)
            setPhoto(result?.employeesResult[0]?.photo)
            setWeekOff(result?.employeesResult[0].week_off)
            setUserName(result?.employeesResult[0].username)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const EmpId = parameter?.id
        if (EmpId) {
            setEmpId(EmpId)
            getEmpData(EmpId)
        }
    }, [parameter])
    useEffect(() => {
        if (!isPhotoChanged) {
            let urlNew = baseURL + photo
            fetch(urlNew, { headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173' } })
                .then(response => response.blob())
                .then(blob => {
                    const file = new File([blob], photo, { type: "image/jpg" });
                    newFile(file, 0)
                    console.log(download)
                });
        }
    }, [photo])
    useEffect(() => {
        data.forEach((element, index) => {
            if (!data.isFileChanged) {
                let urlNew = baseURL + element.name
                fetch(urlNew, { headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173' } })
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], element.name, { type: "application/pdf" });
                        newFile(file, index + 1)
                        console.log(download)
                    });
            }
        })
    }, [data])
    const navigate = useNavigate()
    const [num, setNum] = useState(1)
    const [name, setName] = useState(null)
    const [father_name, setFatherName] = useState(null)
    const [aadhar_no, setAadharNo] = useState(null)
    const [pan_no, setPanNo] = useState(null)
    const [permanent_address, setPermamanentAddress] = useState(null)
    const [local_address, setLocalAddress] = useState(null)
    const [emergency_mobile_no, setEmergencyMobileNumber] = useState(null)
    const [mobile_no, setMobileNo] = useState(null)
    const [dob, setDOB] = useState(null)
    const [marital_status, setMaritalStatus] = useState(null)
    const [gender, setGender] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [department, setDepartment] = useState(null)
    const [section, setSection] = useState(null)
    const [floor, setFloor] = useState(null)
    const [location, setlocation] = useState(null)
    const [week_off, setWeekOff] = useState(null)
    const [head_employee, setHeadEmployee] = useState(null)
    const [hiredByData,setHiredByData]=useState([])
    const [hiredBy, setHiredBy] = useState(null)
    const [hiring_from, setHiringFrom] = useState(null)
    const [lead_date, setLeadDate] = useState(null)
    const [superVisor, setSupervisor] = useState(null)
    const [esi, setESI] = useState(null)
    const [epf, setEpf] = useState(null)
    const [mode_of_pay, setModeOfPay] = useState(null)
    const [fine_mgmt, setFineMgmt] = useState(null)
    const [bank_name, setBankName] = useState(null)
    const [account_no, setAcountNo] = useState(null)
    const [branch, setBranch] = useState(null)
    const [ifsc, setIFSC] = useState(null)
    const [uan_no, setUAN] = useState(null)
    const [locationDisabled, setLocationDisabled] = useState(true)
    const [min_wages, setMinWages] = useState(null)
    const [base_salary, setBaseSalary] = useState(null)
    const [emp_type, setEmpType] = useState(null)
    const [qualification, setQualification] = useState(null)
    const [download, setDownload] = useState([])
    const [floorData, setFloorData] = useState([])
    const incNum = (e) => {
        e.preventDefault()

        try {
            const aadharLen = aadhar_no.toString().length === 12 ? false : true
        const panLen = pan_no.length === 10 ? false : true
        const mobile_no_len = mobile_no.toString().length === 10 ? false : true
        const emergency_mobile_no_len = emergency_mobile_no.toString().length === 10 ? false : true
        if (aadharLen) {
         
         throw new Error('Aadhar Number length should be 12 characters long.')
        }
        if (panLen) {
            throw new Error('Pan length should be 10 characters long.')  
        }
        if(mobile_no_len){
            throw new Error('Mobile length should be 10 characters long.')  
        }
        if(emergency_mobile_no_len){
            throw new Error(' Emergency Mobile length should be 10 characters long.')  
        }
            num < 3 ?
                setNum(prev => { return prev + 1 }) :
                empId !== null ? edit(e) : add(e)
            
        }   catch (error) {
            toast.error(error.message)
         }
    }
    useEffect(()=>{
if(mode_of_pay==='Cash'){
    setIsShow(false)
}
else{
    setIsShow(true)
}
    },[mode_of_pay])
    const add = (e) => {
        e.preventDefault()
     
        

         // console.log(lead_date)
         if (download.length > 2  ) {``
             setIsloading(true)
             axios.post(baseURL + "api/addEmployee", {
                 "name": name,
                 "father_name": father_name,
                 "aadhar_no": aadhar_no,
                 "pan_no": pan_no,
                 "local_address": local_address,
                 "permanent_address": permanent_address,
                 "emergency_no": emergency_mobile_no,
                 "phone": mobile_no,
                 "dob": dob,
                 "marital_status": marital_status,
                 "gender": gender,
                 "qualification": qualification,
                 "store_department_id": section,
                 "designation_id": designation,
                 "department_id": department,
                 "hiring_date_time": lead_date,
                 "lead_from": hiring_from,
                 "head_employee_id": head_employee,
                 "hired_by_employee_id": hiredBy,
                 "bank_name": bank_name,
                 "branch": branch,
                 "ifsc": ifsc,
                 "account_number": account_no,
                 "epf_no": epf,
                 "esi_no": esi,
                 "role_id": designation,
                 "uan_no": uan_no,
                 "fine_management": fine_mgmt === 'Yes' ? 1 : 0,
                 "min_wages_as_per_rule": min_wages,
                 "sub_type": mode_of_pay,
                 "type": emp_type,
                 "base_salary": base_salary,
                 "floor_id": floor,
                 "location_id": location,
                 "photo": download[0],
                 "supervisor_id": superVisor,
                 "week_off": week_off,
                 "username":username,
                 "password":password,
                 "document": download.filter((data, index) => {
                     return index !== 0
                 }),
                 "email":email
             }, { headers }).then((response) => {
                 
 
                         toast.success('Employee Added Successfully!')
                         setTimeout(() => {
                             navigate('/employee_details')
                             setIsloading(false)
                         }, 1000);
                     
                 }).catch((err)=>{
                    if(err.response.status===409){

                        toast.error("Username exists")
        setIsloading(false)
        
                    }

                 })
             
         } else {
             toast.error("Please upload minimum 1 photo and 2 additional documents as pan card and aadhar card scanned copy");
         }
    
    }
    const decNum = (event) => {
        event.preventDefault()
        if (num == 1) {
            return navigate(-1)
        }
        num > 1 ?
            setNum(prev => { return prev - 1 }) :
            setNum(1)
    }
    const newFile = (data, index) => {
        var array = download
        array[index] = data
        setDownload(array)
        console.log(download)
    }
    function changeName(data) {
        setName(data)
    }
    function changeFatherName(data) {
        setFatherName(data)
    }
    function changeAadharNo(data) {
        setAadharNo(data)
    }
    function changePanNo(data) {
        setPanNo(data)
    }
    function changeLocalAddress(data) {
        setLocalAddress(data)
    }
    function changePermamanentAddress(data) {
        setPermamanentAddress(data)
    }
    function changeEmergencyMobileNumber(data) {
        setEmergencyMobileNumber(data)
    }
    function changeMobileNo(data) {
        setMobileNo(data)
    }
    function changeDOB(data) {
        setDOB(data)
    }
    function changeMaritalStatus(data) {
        setMaritalStatus(data)
    }
    function changeDepartment(data) {
        setDepartment(data)
    }
    function changeDesignation(data) {
        setDesignation(data)
    }
    function changeSection(data) {
        setSection(data)
    }
    function changeHeadEmployee(data) {
        setHeadEmployee(data)
    }
    function changeHiredBy(data) {
        setHiredBy(data)
    }
    function changeHiringFrom(data) {
        setHiringFrom(data)
    }
    function changeSupervisor(data) {
        setSupervisor(data)
    }
    function changeLeadDate(data) {
        setLeadDate(data)
    }
    function changePF(data) {
        setEpf(data)
    }
    function changeESI(data) {
        setESI(data)
    }
    function changeBankName(data) {
        setBankName(data)
    }
    function changeFineMgmt(data) {
        setFineMgmt(data)
    }
    function changeAcountNo(data) {
        setAcountNo(data)
    }
    function changeModeOfPay(data) {

        setModeOfPay(data)
    }
    function changeIFSC(data) {
        setIFSC(data)
    }
    function changeBranch(data) {
        setBranch(data)
    }
    function changeMInWages(data) {
        setMinWages(data)
    }
    function chanageEmpType(data) {
        setEmpType(data)
    }
    function changeFloor(data) {
        setFloor(data)
    }
    function changelocation(data) {
        setlocation(data)
    }
    function changeQualification(data) {
        setQualification(data)
    }
    function changeUAN(data) {
        setUAN(data)
    }
    function changeBaseSalary(data) {
        setBaseSalary(data)
    }
    function changeWeekOff(data) {
        setWeekOff(data)
    }
    function changeUserName(data){
        setUserName(data)
    }
    function changePassword(data){
        setPassword(data)
    }
    function changeEmail(data){
        setEmail(data)
    }

    const form1Functions = [
        {
            function: changeName,
            value: name,
            title: 'Name'
        },
        {
            function: changeFatherName,
            value: father_name,
            title: 'Father Name'
        },
        {
            function: changeAadharNo,
            value: aadhar_no,
            title: 'Aadhar No.',
            type:'Number',
           
            
        },
        {
            function: changePanNo,
            value: pan_no,
            title: 'Pan No.',
            splKey:"pan"
        },
        {
            function: changeLocalAddress,
            value: local_address,
            title: 'Local Address'
        },
        {
            function: changePermamanentAddress,
            value: permanent_address,
            title: 'Permanent Address'
        },
        {
            function: changeEmergencyMobileNumber,
            value: emergency_mobile_no,
            title: 'Emergency Number',
            type:'Number',
            
        },
        {
            function: changeMobileNo,
            value: mobile_no,
            title: 'Mobile Number',
            type:'Number',
            
        },
        {
            function: changeEmail,
            value: email,
            title: 'Email',
        },
        {
            function: changeDOB,
            value: dob,
            title: 'DOB',
            type: 'date'
        },
    ]
    const form2Selects = [
        {
            function: changeDepartment,
            value: department,
            title: 'Department',
            num: 2,
            required: true,
            disabled: false
        },
        {
            function: changeWeekOff,
            value: week_off,
            title: 'Week OFF',
            num: 8,
            required: true,
            disabled: false
        },
        {
            function: changeDesignation,
            value: designation,
            title: 'Designation',
            num: 1,
            required: true,
            disabled: false
        },
        {
            function: changeHeadEmployee,
            value: head_employee,
            title: 'Head Employee',
            num: 6,
            required: false,
            disabled: false
        },
        {
            function: changeHiredBy,
            value: hiredBy,
            title: 'Hired By',
            num: 9,
            required: false,
            disabled: false
        },
        {
            function: changeSupervisor,
            value: superVisor,
            title: 'Supervisor',
            num: 7,
            required: false,
            disabled: false
        },
        {
            function: changeSection,
            value: section,
            title: 'Section',
            num: 5,
            required: false,
            disabled: false
        },
        {
            function: changelocation,
            value: location,
            title: 'Location',
            num: 4,
            required: true,
            disabled: false
        },
    ]
    const spl_form2_selects = [
        {
            function: changeFloor,
            value: floor,
            title: 'Floor',
            num: 3,
            required: true,
            disabled: false
        },
    ]
    const form2Input = [
        {
            function: changeHiringFrom,
            value: hiring_from,
            title: 'Hiring From',
            required: true
        },
        {
            function: changeLeadDate,
            value: lead_date,
            title: 'Lead Date',
            type: 'date',
            required: true
        },
       
        {
            function: changeQualification,
            value: qualification,
            title: 'Qualification',
            required: true
        }
    ]
    const form3Input = [
        {
            function: changeESI,
            value: esi,
            title: 'ESI',
            required: false,
            show:isShow,
        },
        {
            function: changePF,
            value: epf,
            title: 'PF',
            required: false,
            show:isShow,
        },
        {
            function: changeBankName,
            value: bank_name,
            title: 'Bank Name',
            required: false,
            disabled: bankdetailsDisabled,
            show:isShow
        },
        {
            function: changeBranch,
            value: branch,
            title: 'Branch',
            required: false,
            disabled: bankdetailsDisabled,
            show:isShow
            
        },
        {
            function: changeIFSC,
            value: ifsc,
            title: 'IFSC',
            required: false,
            disabled: bankdetailsDisabled,
            show:isShow
        },
        {
            function: changeAcountNo,
            value: account_no,
            title: 'Account N0.',
            required: false,
            disabled: bankdetailsDisabled,
            type:'Number',
            show:isShow
        },
        {
            function: changeMInWages,
            value: min_wages,
            title: 'Min Wages',
            required: false,
            disabled: bankdetailsDisabled,
            type:'Number',
            show:isShow
        },
        {
            function: changeUAN,
            value: uan_no,
            title: 'UAN No.',
            required: false,
            type:'Number',
            disabled: bankdetailsDisabled,
            show:isShow
        },
        {
            function: changeBaseSalary,
            value: base_salary,
            title: 'Base Salary',
            required: true,
            type:'Number',
            disabled: isShow,
            show:true
        },
        {
            function: changeUserName,
            value: username,
            title: 'Username',
            required: isLogin,
            show:isLogin
        },
        {
            function: changePassword,
            value: password,
            title: 'Password',
            required: empId === null?isLogin?true:false:false,
            show:isLogin
        },
    ]
    const changePhoto = (data) => {
        setIsPhotoChanged(true)
        setPhoto(URL.createObjectURL(data))
        newFile(data, 0)
        console.log(download)
    }
    const changeDocument = (data, index) => {
        data.isFileChanged = true
        newFile(data, index)
        console.log(download)
    }
    const renderPage = (num) => {
        switch (num) {
            case 1:
                return <AddEmployee_form1 formData={form1Functions} changeGender={setGender} genderValue={gender} changeMaritalStatus={setMaritalStatus} marital_status={marital_status} />
            case 2:
                return <AddEmployee_form2 floorData={floorData} locationOptions={locationOptions} hiredByData={hiredByData} supervisorData={supervisorData} head_employee_data={headEmployeeData} spl_key={designation} formSelect={form2Selects} formInput={form2Input} spl={spl_form2_selects} role_data={roleData} />
            case 3:
                return <AddEmployee_form3 isLogin={isLogin} formInput={form3Input} changeModeOfPay={changeModeOfPay} mode_of_pay={mode_of_pay} changeFineMgmt={changeFineMgmt} fine_mgmt={fine_mgmt} newFile={newFile} chanageEmpType={chanageEmpType} emp_type={emp_type} edit={true} data={data} photo={photo} changePhoto={changePhoto} isPhotoChanged={isPhotoChanged} changeDocument={changeDocument} isEdit={empId !== null} />
            default: return <h1>nothing</h1>
        }
    }
    const edit = () => {
      
        let formData = {
            "name": name,
            "father_name": father_name,
            "aadhar_no": aadhar_no,
            "pan_no": pan_no,
            "local_address": local_address,
            "permanent_address": permanent_address,
            "emergency_no": emergency_mobile_no,
            "phone": mobile_no,
            "dob": dob,
            "marital_status": marital_status,
            "gender": gender,
            "qualification": qualification,
            "store_department_id": section,
            "designation_id": designation,
            "department_id": department,
            "hiring_date_time": lead_date,
            "lead_from": hiring_from,
            "head_employee_id": head_employee,
            "hired_by_employee_id": hiredBy,
            "bank_name": bank_name,
            "branch": branch,
            "ifsc": ifsc,
            "account_number": account_no,
            "epf_no": epf,
            "esi_no": esi,
            "role_id": designation,
            "uan_no": uan_no,
            "fine_management": fine_mgmt === 'Yes' ? 1 : 0,
            "min_wages_as_per_rule": min_wages,
            "sub_type": mode_of_pay,
            "type": emp_type,
            "base_salary": base_salary,
            "floor_id": floor,
            "location_id": location,
            "week_off": week_off,
            "supervisor_id": superVisor,
            "username":username,
            "password":password,
            "email":email
        }
        let array = download
        array.forEach((data) => {
            delete data.isFileChanged
        })
        setDownload(array)
        if (download.length > 0) {
            formData.photo = download[0]
        }
        if (download.length > 1) {
            formData.document = download.filter((data, index) => {
                return index !== 0
            })
        }
        setIsloading(true)
        axios.patch(baseURL + 'api/editEmployee/' + empId, {
            ...formData
        }, { headers }).then((response) => {
            
                    
                                            toast.success('Employee Edited Successfully!')
                                            setTimeout(() => {
                                                navigate('/employee_details')
                                                setIsloading(false)
                                            }, 1000);
                                        }).catch((err)=>{
                                            console.log(err)
                                            if(err.response.status===409){

                                                toast.error("Username exists")
                    setIsloading(false)

                                            }
                                        })
            
        
    }
    useEffect(() => {
        if (designation !== null) {
            axios.get(baseURL + "api/getRoleData?id=" + designation, { headers }).then((roleResponseData) => {
                setLocationOptions(roleResponseData?.data.map((data)=>{
                    let obj={}
                    obj.id=data.location_id
                    obj.name=data.name
                    return obj
                }))
                let array=['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge','Guard']
                if(array.includes(roleResponseData.data[0]?.role_name)){
                    setIsLogin(true)
                }
                else{
                    setIsLogin(false)
                }
                axios.get(baseURL + "api/getParentRole?role_id=" + designation, { headers }).then((parentRoleResult) => {
                    axios.get(baseURL + "api/getEmployeesBasedOnRole?role_name=" + parentRoleResult.data[0]?.name, { headers }).then((response) => {
                        setHeadEmployeeData(response.data)
                        axios.get(baseURL + "api/getParentRole?role_id=" + parentRoleResult.data[0].id, { headers }).then((superParentRoleResult) => {
                            console.log(superParentRoleResult)
                            axios.get(baseURL + "api/getEmployeesBasedOnRole?role_name=" + superParentRoleResult?.data[0]?.name, { headers }).then((response) => {
                                setSupervisorData(response.data)
                            })

                        })
                    })
                })
            })
        }
    }, [designation])
    useEffect(() => {
        if(department===null){
            axios.get(baseURL + "api/getRoles", { headers }).then((response) => {
                // response.data = response.data.filter((data) => data.name !== 'Super Admin' && data.name !== 'Admin')
                response.data = response.data.filter((data, index, self) => {
                    let indexOne = self.findIndex((dataOne) => dataOne.name === data.name)
                    console.log(indexOne)
                    if (indexOne === index) {
                        return data
                    }
                })
                setRoleData(response.data)
            })
        }
        else{

            axios.get(baseURL + "api/getRoles?department_id=" + department, { headers }).then((response) => {
                // response.data = response.data.filter((data) => data.name !== 'Super Admin' && data.name !== 'Admin')
                response.data = response.data.filter((data, index, self) => {
                    let indexOne = self.findIndex((dataOne) => dataOne.name === data.name)
                    console.log(indexOne)
                    if (indexOne === index) {
                        return data
                    }
                })
                setRoleData(response.data)
            })
        }
    }, [department])
    useEffect(()=>{
        if(location!==null){
            axios.get(url + "api/getFloors?location_id="+location, { headers }).then((response) => {
                setFloorData(response.data)
              })
        }
       
    },[location])
    useEffect(()=>{
        axios.get(baseURL + "api/getEmployeesBasedOnRole?role_name=HR Head", { headers }).then((response) => {
            setHiredByData(response.data)
        })
    },[])
    return (
        <React.Fragment>
            <ToastContainer></ToastContainer>
            <Heading heading={parameter.id ? 'Edit Employee' : 'Add Employee'} />
            <StepBar value={num} />
            <form className={classes.rendered_page} onSubmit={incNum} >
                {renderPage(num)}
                <div className={classes.btn_container}>
                    <button type="button" className={classes.cancel} onClick={decNum}>back</button>
                    <button disabled={isLoading} type={'submit'} className={classes.accept} >Continue</button>
                    {/* <button  className={classes.accept} onClick={incNum} >Continue</button> */}
                </div>
            </form>
        </React.Fragment>
    )
}
export default AddEmployee