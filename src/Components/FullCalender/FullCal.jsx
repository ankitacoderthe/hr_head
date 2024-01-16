import React, { useRef, useState,useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './FullCal.css'
import classes from './FullCal.module.css'
import searchImg from '../../assets/search.png'
import moment from 'moment'
const FullCal = (props) => {

  const calendarRef = useRef(null);
  const [date, setDate] = useState(null)

  

  const renderTileColor = (event) => {
    switch (event.backgroundColor) {
      case 'Present':
        return classes.tile_color_present
      case 'Absent':
        return classes.tile_color_absent
      case 'Pending':
        return classes.tile_color_pending
      default:
        return 'none'
    }
  }

  const showAlert = (title) => {
    // alert(title)
  }


  function renderEventContent(eventInfo) {
    return (
      <div className={`eventdiv ${classes.tile}`} >
        <div className={`${classes.tile_color_div} ${renderTileColor(eventInfo)}`}></div>
        <span>{eventInfo.event.title}</span>
      </div>
    )
  }

  const dateHandler = (e) => {
    const date = e.target.value
    setDate(date)
  };

  const searchhandler = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
    props.dateFunc(date)
  }
useEffect(() => {
  const calendarApi = calendarRef.current.getApi();
  let from_date = moment([props.year,props.month]).startOf('month').format("YYYY-MM-DD")
     let end_date = moment([props.year,props.month]).endOf('month').format("YYYY-MM-DD")
  setDate(from_date)
  console.log(props.year)
    calendarApi.gotoDate(from_date);
    
}, [])

  return (
    <>
      <div className={classes.input_container}>
        <input onChange={dateHandler} type="date" value={date} />
        <button onClick={searchhandler}><img src={searchImg} alt="search icon" /></button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={props.event}
        eventContent={renderEventContent}
        ref={calendarRef}
      />
    </>
  )
}

export default FullCal