import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import axios from 'axios'

import Cookies from 'universal-cookie'
import { baseURL } from '../../../util'
const ExpenseApproval = () => {
  const [expenseHistoryData, setExpenseHistorydata] = useState([])
  const cookies = new Cookies()
  const token = cookies.get('hr_head_token')
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [employee_data, setEmployeeData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const { employee_id, id } = useParams()
  const { sendRequest: fetchEmployee } = useHttp()

  const [empId, setEmpId] = useState(null)
  
  useEffect(() => {
    
    const headers = { "Authorization": "Bearer " + token }
    const listEmployee = (employeeData) => {
      setEmployeeData([{
        title: "Name",
        value: employeeData.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeData.headEmployeesResult[0].head_employee_name
      }, {
        title: 'Designation',
        value: employeeData.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeData.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeData.employeesResult[0].gender

      }, {
        title: 'location name',
        value: employeeData.employeesResult[0].location_name
      }, {
        title: 'location Department',
        value: employeeData.employeesResult[0].store_department_name
      }])
      setEmpId(employeeData.employeesResult[0].empID)

    }
    fetchEmployee({ url: baseURL + "api/getEmployeeDetails?id=" + employee_id }, listEmployee)
    axios.get(baseURL + "api/getExpenseDataByExpenseId?id=" + id, { headers }).then((response) => {
      setExpenseData(response.data)
    })
    axios.get(baseURL + "api/getExpenseHistory?id=" + employee_id, { headers }).then((response) => {
      response.data.forEach((data)=>{
        data.status_date=data.status_date?.split(" ")[0].split("-").reverse().join("-")
                    })
      setExpenseHistorydata(response.data)
    })


  }, [])
  const tableHeadings = [
    {heading:'Amount'},
      {heading:'Request Date'},
      {heading:'Expense Type'},
      {heading:'Status'},
      {heading:'Status date'},
  ]
  const tableKeys = ['amount' , 'date','category_name','status','status_date']




  return (
    <React.Fragment>
      <Heading heading={'Expense Details'} />
      <DetailsDivContainer data={employee_data} />
      <ExtraDetails status={expenseData[0]?.status} data={expenseData} employee_id={employee_id} />
      <h3 className='uni_heading'>Expense History</h3>
      <MainTable headings={tableHeadings} keys={tableKeys} data={expenseHistoryData} height={true} />

    </React.Fragment>
  )
}

export default ExpenseApproval