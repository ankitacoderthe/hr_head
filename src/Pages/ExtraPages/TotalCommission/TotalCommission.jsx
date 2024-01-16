import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import { useState,useEffect } from 'react'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { url } from '../../../util'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
const TotalCommission = () => {
  const cookies = new Cookies();
  const token = cookies.get('hr_head_token')
  const [employee_data,setEmployeeData] = useState([])
  const [commissionArray,setCommissionArray]=useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const tableKeys = ['date','day','commission']
  const tableHeading = [
    {heading:'Date'},
    {heading:'Day'},
    {heading:'Commission'}
  ]
  const{empID,month,year,id}=useParams()
  useEffect(()=>{
    
    // if(token===null){
    // navigate('/login')
    // }
    const headers={"Authorization":"Bearer "+token}
    
    const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
    const listEmployee = (employeeDetails) => {
      setEmployeeData([{
        title: "Name",
        value: employeeDetails.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeDetails.headEmployeesResult[0]?.head_employee_name
      }, {
        title: 'Designation',
        value: employeeDetails.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeDetails.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeDetails.employeesResult[0].gender

      }, {
        title: 'location name',
        value: employeeDetails.employeesResult[0].location_name
      }, {
        title: 'location Department',
        value: employeeDetails.employeesResult[0].store_department_name
      }])
        setEmpId(employeeDetails.employeesResult[0].empID)
  
      }
      
      fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + id }, listEmployee)
      let from_date=moment([year,month])
      axios.get(url + "api/getCommissionData?employee_id=" + empID + "&date=" + moment(from_date).format("YYYY-MM-DD"), { headers }).then((response) => {
       
       let dataArray=[]
       for (let i=0;i<moment(from_date).daysInMonth();i++){
        let obj={}
        let index=response.data.findIndex((data)=>{
          return data.date==moment(from_date).add(i,'d').format("YYYY-MM-DD")
        })
        obj.date=moment(from_date).add(i,'d').format("YYYY-MM-DD")
        obj.day=dayArray[moment(from_date).add(i,'d').day()]
                    if(index!=-1){
                   obj.commission=  response.data[index].commission
                    }else{
                      obj.commission=0
                    }
                    dataArray.push(obj)
                  }
        setCommissionArray(dataArray)
     
       
      })
        
        
      
    },[])
  return (
    <React.Fragment>
      <Heading heading={'Total Commission'} />
      <DetailsDivContainer data={employee_data} />
      <br />
      <h3 className='uni_heading'>Commission Table</h3>
      <MainTable height={true} headings={tableHeading} keys={tableKeys} data={commissionArray}  />
      <BottomButtonContainer cancel={'Back'} approve={'Download Summary'}  />
    </React.Fragment>
  )
}

export default TotalCommission

