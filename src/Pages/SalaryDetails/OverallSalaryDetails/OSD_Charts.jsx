import React, { useEffect, useState } from 'react'
import classes from './OSD_Charts.module.css'
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment'
import axios from 'axios'
import { url } from '../../../util'
import ReactApexChart from 'react-apexcharts';

const OSD_Charts = (props) => {
  const [data, setData] = useState({
    seriesSpark3: [{
      data: []
    }], optionsSpark3: {
      chart: {
        type: 'area',
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3
      },
      xaxis: {
        crosshairs: {
          width: 2
        },
      },
      yaxis: {
        min: 0
      },

    }
  })
  var cookies = new Cookies()
  var token = cookies.get('hr_head_token')
  const { sendRequest: fetchAttendance } = useHttp()
  const [empID, setEmpID] = useState(null)
  const [date, setDate] = useState(new Date())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  useEffect(() => {
    const listWorkingdays = (attendance) => {
      setSeries(attendance.length)
    }
    let year = new Date().getFullYear()
    let from_date = moment([year, month - 1])
    let end_date = moment([year, month - 1]).add(1, 'M')
    setEmpID(props.emp_id)
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + props.emp_id + "&status='Present'" }, listWorkingdays)

  }, [])
  useEffect(() => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getCommissionData?employee_id=" + props.emp_id + "&date=" + moment(date).format("YYYY-MM-DD"), { headers }).then((response) => {
      let data = response.data.map((ele) => {
        return [ele.date, ele.commission]
      })
      setData({
        seriesSpark3: [{
          data: data
        }],
        optionsSpark3: {
          chart: {
            type: 'area',
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'straight'
          },
          fill: {
            opacity: 0.3
          },
          xaxis: {
            crosshairs: {
              width: 2
            },
          },
          yaxis: {
            min: 0
          },

        }
      })
    })
  }, [date, empID])

  useEffect(() => {
    let year = new Date().getFullYear()
    let from_date = moment([year, month - 1,])
    let no_of_days = from_date.daysInMonth()
    const listWorkingdays = (attendance) => {
      console.log(attendance.length)
      setSeries(attendance.length / no_of_days)
    }



    let end_date = moment([year, month - 1,]).add(1, 'M')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + props.emp_id + "&status='Present'" }, listWorkingdays)

  }, [month])
  console.log(props)
  return (
    <div className={classes.container}>
      <div className={classes.container3}>
        <div className={classes.circle_div1}>
          % of Attendence
          <select id='gMonth1' onChange={(e) => setMonth(e.target.value)}>
            <option value=''>--Select Month--</option>
            <option selected={month === 1} value='1'>Janaury</option>
            <option selected={month === 2} value='2'>February</option>
            <option selected={month === 3} value='3'>March</option>
            <option selected={month === 4} value='4'>April</option>
            <option selected={month === 5} value='5'>May</option>
            <option selected={month === 6} value='6'>June</option>
            <option selected={month === 7} value='7'>July</option>
            <option selected={month === 8} value='8'>August</option>
            <option selected={month === 9} value='9'>September</option>
            <option selected={month === 10} value='10'>October</option>
            <option selected={month === 11} value='11'>November</option>
            <option selected={month === 12} value='12'>December</option>
          </select>
        </div>
        <div className={classes.circle_div2}><Donutchart series={Math.round((series * 100).toFixed(2))} /></div>
        <div className={classes.circle_div3}>
          <div className={classes.circle_div3_div}>
            <span>{series !== undefined ? (series * 100).toFixed(2) : 0}%</span>
            <div className={`${classes.circle_div3_inner_div}`}>
              <div className={`${classes.colored}`}></div> Present
            </div>
          </div>
          <div className={classes.circle_div3_div}>
            <span>{series != undefined ? (100 - (series * 100)).toFixed(2) : 100}%</span>
            <div className={classes.circle_div3_inner_div}>
              <div></div> Present
            </div>
          </div>
        </div>
      </div>
      <div className={classes.container4}>
        <div className={classes.con4_heading}>
          Overall Performance : <span>Commission</span>

        </div>

        <div className={classes.container}>
          <ReactApexChart options={data.optionsSpark3} series={data.seriesSpark3} type="area" height={'220'} />
        </div>
      </div>
    </div>
  )
}

export default OSD_Charts
