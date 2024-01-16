import React, { useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import MainTable from '../../Components/MainTable/MainTable'
import InterviewModal from '../../Components/AllModals/InterviewModal'
import { useState } from 'react'
import InterviewFilter from '../../Components/InterviewFilter/InterviewFilter'
import { url } from '../../util'
const TodayInterviews = () => {
  
  // Here is our data for tile in the page
  const [date, setDate] = useState([new Date(),new Date()])
  const [data, setData] = useState([])
  const [interviewData, setInterviewData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    interviewer_name: '',
    floor_name: "",
    interviewee_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchInterview } = useHttp()
  const [TileData, setTileData] = useState([])
  useEffect(() => {
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment()

   
    // axios.get(url + "api/getEmployeesBasedOnRole?role_name='Floor Incharge'", { headers }).then((response) => {
    //   setInterviewData(response.data)
    // })
   
    from_date = moment()
    axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {

      from_date = moment().subtract(1, 'd')
      axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseOne) => {

        from_date = moment()
        axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Trial'", { headers }).then((responseTwo) => {
          from_date = moment().subtract(1, 'd')
          axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Trial'", { headers }).then((responseThird) => {

            from_date = moment()
            axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Rejected'", { headers }).then((responseFourth) => {
              from_date = moment().subtract(1, 'd')
              axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Rejected'", { headers }).then((responseFifth) => {

                from_date = moment()

                axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Permanent'", { headers }).then((responseSixth) => {
                  from_date = moment().subtract(1, 'd')
                  axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Permanent'", { headers }).then((responseSeventh) => {
                    setTileData([
                      {
                        title: 'Total Interviews',
                        value: response.data[0].count_id,
                        num: response.data[0].count_id - responseOne.data[0].count_id,
                        link:"/interviews/today-interviews"
                      },
                      {
                        title: 'Total Trials',
                        value: responseTwo.data[0].count_id
                        ,
                        num: responseTwo.data[0].count_id
                          - responseThird.data[0].count_id,
                          link:"/interviews/total-trials"
                      },
                      {
                        title: 'Total Rejected',
                        value: responseFourth.data[0].count_id,
                        num: responseFourth.data[0].count_id
                          - responseFifth.data[0].count_id,
                          link:"/interviews/total-rejected"
                      },
                      {
                        title: 'Total Permanent',
                        value: responseSixth.data[0].count_id,
                        num: responseSixth.data[0].count_id
                          - responseSeventh.data[0].count_id,
                          link:'/interviews/total-permanent'
                      }
                    ])
                  })
                })
              })
            })
          })
        })
      })

    })
  }, [])
  useEffect(() => {

    let getString = url + "api/getInterviews?"
     if (date?.length>1){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date?.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    if (employeeFilter.interviewer_name != '' && employeeFilter.interviewer_name !== undefined) {
      getString += "&interviewer_name=" + employeeFilter.interviewer_name
    }
    if (employeeFilter.interviewee_name != '' && employeeFilter.interviewee_name !== undefined) {
      getString += '&interviewee_name=' + employeeFilter.interviewee_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }

    const listInterview = (interview) => {

      interview.forEach((data) => {
        data.date_time = data.date_time.split(" ")[0].split("-").reverse().join("-")
      })
      setData(interview)
    }
    fetchInterview({ url: getString }, listInterview)
     getString = url + "api/getInterviews?"
      if (date.length>1){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
        else if (date.length>0){
          let from_date=moment(date[0])
          
          let to_date=moment(date[date.length-1]).add(1,'d')
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
        }
    
  
    if (employeeFilter.interviewer_name != '') {
      getString += "&interviewer_name=" + employeeFilter.interviewer_name
    }
    if (employeeFilter.interviewee_name != '') {
      getString += '&interviewee_name=' + employeeFilter.interviewee_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }

    const listTotal = (interview) => {
      const designations= interview.map((d)=>{
        return d.designation_id
      })
      
      let queryString=''
      designations.forEach((designation,index)=>{
        if (index===0){
          queryString+="role_id="+designation
        }
        else{
          queryString+="&role_id="+designation
        }
      })
      console.log("queryString in date",queryString)
      if(queryString!==''){
try {
  const token = cookies.get('hr_head_token')
  const headers = { "Authorization": "Bearer " + token }
  axios.get(url + "api/getParentRole?"+queryString, { headers }).then((parentRoleResult) => {
    
    axios.get(url + "api/getEmployeesBasedOnRole?role_name=" + parentRoleResult.data[0]?.role_name, { headers }).then((response) => {
        setInterviewData(response.data)
        setTotal(interview.length)
    })
})
} catch (error) {
  console.log(error)
}
     
      }

      
    }
 
    fetchInterview({ url: getString }, listTotal)
  }, [date, limit, offset, employeeFilter])
  const selectBylocation = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, location_name: data }
    })

  }
  const selectByFloor = async (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, floor_name: data }
    })
  }

  const changeDate = (data) => {
    setLimit(10)
    setOffset(0)
    setDate(data)
  }
  const changeByInterviewer = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, interviewer_name: data }
    })
  }
  const changeByInterviewee = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, interviewee_name: data }
    })

  }
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    setOffset((data - 1) * limit)
  }
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Interviewee' },
    { heading: 'Interview Date' },
    { heading: 'Interviewer' },
    { heading: 'Reference' },
    { heading: 'Remarks' },
    { heading: 'Status' },
  ]

  const tableKeys = [
    'employee_name', 'date_time', 'interviewer_name', 'reference', 'remarks', 'status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    navigate("/update-interview/"+element.id)
   }
console.log(data);
  return (
    <React.Fragment>
      <Heading heading={'Interviews'} Btn={'Interview'} Btn_link={'/add_interview'} />
      <TileContainer Data={TileData} />
      <InterviewFilter date={date} isdate={date} data={data} data2={interviewData} changeDate={changeDate} changeByInterviewee={changeByInterviewee} changeByInterviewer={changeByInterviewer} />
      <MainTable func={changeModalState} Lnk6={true} link1={false} t3={'Interview Details'} App_Btn={true} height={true} headings={tableHeadings} keys={tableKeys} link2={false} data={data} link4={false} />
      {/* <InterviewModal value={newval} setval={setNewVal} Obj={obj} /> */}
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>


export default TodayInterviews