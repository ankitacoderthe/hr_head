import React,{useState,useEffect} from 'react'
import MainTable from '../../../../Components/MainTable/MainTable'
import axios from 'axios'
import Cookies from 'universal-cookie'
const IncrementHistory = (props) => {
    const cookies = new Cookies();
    // const url="http://localhost:9000/"
    const [data,setData]=useState([])
useEffect(()=>{
    const token = cookies.get('hr_head_token')
    const headers={"Authorization":"Bearer "+token}
    setData(props.data)
// axios.get(url+"api/getSalaryIncrement",{headers}).then((response)=>{
// setData(response.data)
// })
},[])
    const tableHeading = [
        { heading: 'Salary' },
        { heading: 'Increment' },
        { heading: 'Date of Increment' },
        { heading: 'Status' },
    ]

    const tableKeys = ['base_salary', 'increment' , 'date' , 'status']

    console.log(data)

    return (
        <React.Fragment>
            <h3 className='uni_heading'>Increment History</h3>
            <MainTable headings={tableHeading} keys={tableKeys} data={data} />
        </React.Fragment>
    )
}

export default IncrementHistory
