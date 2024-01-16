import classes from './Filter.module.css'
import mag from '../../assets/search2.png'
import vec from '../../assets/vector9.png'
import { useState } from 'react'
import MainTable from '../MainTable/MainTable'
import { useEffect } from 'react'
// Importing Datepicker
// import DatePicker from "react-datepicker";
import DatePicker from "react-multi-date-picker";
// import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import Cookies from 'universal-cookie'
import { baseURL } from '../../util'
import moment from 'moment'
const Filter = (props) => {
  const url=baseURL
const [month,setMonth]=useState(null)
  const cookies = new Cookies();
  const [View, setView] = useState(false)
  const [startDate, setStartDate] = useState([]);
  const[designationOptions,setDesignationOptions]=useState([])
  const[selectedDesignation,setSelectedDesignation]=useState('')
  const filterByDesignation=async(e)=>{
    setSelectedDesignation(e.target.value)
    props.changeByDesignation(e.target.value)
    }
    useEffect(() => {
      const fetching=async()=>{
        const token = cookies.get('hr_head_token')
        const headers={"Authorization":"Bearer "+token}
        axios.get(url+"api/getRoles",{headers}).then((response)=>{
          setDesignationOptions(response.data)
        })
      }
      setMonth(props.date)
      fetching()
  }, [])
  console.log(month)
  let tableData = props.data.length>0&&props.data.map((element) => (
    {
      employee_name: element.employee_name,
      empID: element.empID,
      image: element.image
    }
  ))
  let newArray=[]
  let count=0
  if(tableData?.length>0){
    tableData.forEach((element)=>{
    let index=tableData.findIndex((ele)=>{
      return ele.empID===element.empID
    })
    if(index===count){
      newArray.push(element)
    }
    count+=1
    })
     }
     tableData=newArray
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Emp ID' }
  ]

  const [state, setstate] = useState('')
 const changeMonth=(monthSelected)=>{
setMonth(monthSelected)

  props.changeMonth(monthSelected.month.number-1)
  props.changeYear(monthSelected.year)
 }
       
  const handleChange = (e) => {
    setView(true)
    const results = tableData.filter(post => {
      if (e.target.value === " ") return tableData
      return post.employee_name.toLowerCase().includes(e.target.value.toLowerCase())||post.empID.includes(e.target.value)
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }


  function CancelView() {
    setTimeout(() => {
      setView(false)
    }, 1000);
  }
  function changeByEmployee(key){
    setView(false)
    setstate({
      query:''
    })
    props.changeByEmployee(key)
  }
  // const emptyInp = (e) => {
  //   setView(false)
  //   if (e.target.value == '') {
  //     props.changeByEmployee('')
  //   }
    
  // }
  const clickToChangeEmployee=()=>{
    setView(false)
   
    props.changeByEmployee(state.query)
  }

  return (

    <div className={classes.filter_box}>
      <form  className={classes.input_div}>
        <label htmlFor="Employees">Employees</label>
        <input value={state.query} onChange={handleChange} type="text" id='Employees' placeholder='Emp ID , Employee Name..' />
        <img className={classes.img1} src={mag} alt="" onClick={(e)=>clickToChangeEmployee()} />
        <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
          <MainTable view_btn={true} searchFunc={changeByEmployee}  type={'button'}Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['employee_name', 'empID']} />
        </div>
      </form>

      <div className={classes.input_div}>
        <label htmlFor="Designation">Designation</label>
        <select
            value={selectedDesignation}
            onChange={filterByDesignation}
            id="Designation"
            >
              <option defaultValue="All Designation"></option>
            {designationOptions&&designationOptions.map((value) => <option key={value.id} value={value.name} >{value.name}</option>)}
            </select>
        <img src={vec} className={classes.img2} alt="" />
      </div>


      <div className={`${classes.input_div} ${classes.dp_inp}`} style={{ marginRight: '0' }}>
        <label htmlFor="date">Date</label>
         {/* <input id='date' type="date" />
        <img src={vec} className={classes.img2} alt="" /> */}
      
       <DatePicker onlyMonthPicker  value={month} onChange={changeMonth} format="MM-YYYY"  />
         <img src={vec} className={classes.img2} alt="" />
      </div>


    </div>
  )
}

export default Filter