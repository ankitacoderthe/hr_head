import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddExpense.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LabeledSelect from '../../../Components/LabeledSelect/LabeledSelect'
import { ToastContainer, toast } from 'react-toastify'
import { url } from '../../../util'
const AddExpense = () => {
    const [isLoading,setIsloading]=useState(false)
    const cookies = new Cookies()
    const token = cookies.get('hr_head_token')
    const navigate = useNavigate()
    const [employee_data, setEmployeeData] = useState([])
    const [date, setDate] = useState('')
    const [text, setText] = useState('')
    const [notes, setNotes] = useState('')
    const [noData, setNoData] = useState(true)

    const [View, setView] = useState(false)
    const [searchtext, setSearchText] = useState('')
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [amount, setAmount] = useState(null)
    const [employee_id, setEmployeeId] = useState(null)

    
   
    const dateHandler = (data) => { console.log('date', data); setDate(data) }
    const amountHandler = (data) => { console.log('date', data); setAmount(data) }
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
    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getCategories", { headers }).then((response) => {
            setCategories(response.data)
        })
        axios.get(url + "api/getSubCategories", { headers }).then((response) => {
            setSubCategories(response.data)
        })

    }, [])

    function add(e) {
        e.preventDefault();

        const headers = { "Authorization": "Bearer " + token }

        if (employee_id === null) {
            toast.error("Employee must be present")
        }

        else {
            setIsloading(true)
            axios.post(url + "api/addExpenses", {
                "employee_id": employee_id,
                "category_id": category,
                "sub_category_id": subCategory,
                "date": date + " " + "00:00:00",
                "amount": amount,
                "notes": notes,
                "status": "Pending"
            }, { headers }).then((response) => {
                if (response) {
                    toast.success('Expense Add Successfully!')
                    setTimeout(() => {
                        navigate(-1)
                    }, 1000);
                }
            })
        }

    }
    function cancel(e) {
        e.preventDefault()
      return   navigate(-1)
    }

    useEffect(() => {
        console.log(category)
        if (category === '3') {
            setView(true)
        }
        else {
            setView(false)
        }
    }, [category])


    return (
        <React.Fragment>
            <ToastContainer></ToastContainer>
            <Heading heading={'Add Expense'} />
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
            <form className='uni_container' onSubmit={add}>
                <div className={classes.inner_container}>
                    <div className={classes.add_expense_seleecct_container}>
                        <label htmlFor="slt">Category</label>
                        <SelectTag required={true} usingid={true} select_id={'slt'} title={'Category'} img={Img} selectedVal={(data) => setCategory(data)} data={categories} />
                    </div>
                    <LabeledInput required={true} cls={true} func2={dateHandler} id={'date'} ph={'Date'} title={'Date'} type={'date'} img={false} />
                    <LabeledInput required={true} cls={true} func2={amountHandler} mr={true} id={'amount'} ph={'Amount'} title={'Amount'} type={'text'} img={false} />
                    <div className={` ${View === true ? classes.add_expense_seleecct_container : classes.invisible}`}>
                        {/* <label htmlFor="slt">Sub Category</label>
                        <SelectTag usingid={true} select_id={'slt'} title={'Sub Category'} img={Img} selectedVal={(data) => setSubCategory(data)} data={subCategories} /> */}
                        <LabeledSelect usingid={true} select_id={'slt'} title={'Sub Category'} img={Img} selectedVal={(data) => setSubCategory(data)} data={subCategories} />
                    </div>
                </div>
                <div className={classes.textarea_container}>
                    <label htmlFor="rea">Reason</label>
                    <textarea required id="rea" type="text" className={classes.add_expense_textarea} value={notes} onInput={(e) => setNotes(e.target.value)} />
                </div>
                <BottomButtonContainer disabled={isLoading}  cancel={'Cancel'} approve={'Add Expense'} f1={true} func={true} cancelRequests={cancel} func2={false} />
            </form>
        </React.Fragment>
    )
}

export default AddExpense