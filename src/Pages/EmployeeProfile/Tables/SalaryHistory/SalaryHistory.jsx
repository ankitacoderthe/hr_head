import React,{useState,useEffect} from 'react'
import MainTable from '../../../../Components/MainTable/MainTable'
import axios from 'axios'
import Cookies from 'universal-cookie'
const SalaryHistory = (props) => {

    const tableHeading = [
        { heading: 'Salary Month' },
        { heading: 'EMPId' },
        { heading: 'Salary' },
        { heading: 'Status' },
        { heading: 'Salary Slip' },
    ]

    const tableKeys = ['month','empID','net_payable_salary', 'status' ]
    const monthArray=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const cookies = new Cookies();
    // const url="http://localhost:9000/"
    const [data,setData]=useState([])
useEffect(()=>{
    const token = cookies.get('hr_head_token')
    const headers={"Authorization":"Bearer "+token}
    let data=props.data
    data.month=monthArray[data.month]
    setData(data)
// axios.get(url+"api/getSalaryIncrement",{headers}).then((response)=>{
// setData(response.data)
// })
},[])
  
console.log(data)

    return (
        <React.Fragment>
            <h3 className='uni_heading'>Salary History</h3>
            <MainTable headings={tableHeading} keys={tableKeys} data={data} />
        </React.Fragment>
    )
}

export default SalaryHistory
