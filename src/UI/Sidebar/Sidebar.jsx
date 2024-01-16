import classes from './Sidebar.module.css'
import Img from '../../assets/logo.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Attendence from '../../assets/Widget_add.png'
import Wallet from '../../assets/Wallet_alt.png'
import Chart from '../../assets/Chart.png'
import Check from '../../assets/Check_ring.png'
import Clock from '../../assets/Clock2.png'
import Arrows from '../../assets/arrows.png'
import Tie from '../../assets/Tie.png'
import User from '../../assets/User.png'
import Report from '../../assets/Desk.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

import PendingIcon from "../../Components/PendingIcon/PendingIcon"
import { baseURL } from '../../util'
const Sidebar = (props) => {
  const location = useLocation();
  const cookies = new Cookies();
  const token = cookies.get('hr_head_token')
  const headers = { "Authorization": "Bearer " + token }
  const [permissions, setPermissions] = useState([])
  useEffect(() => {
    axios.get(baseURL + "api/getPermissions", { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        let permissions = response.data.map((perm) => {
          return perm.name
        })
        setPermissions(permissions)
      }
    })
  }, [])
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar_header_top}>
      <Link className={classes.navbar_logo} to='/'><img src={Img} alt="logo" /> </Link>
        <button onClick={() => { props.onSideberBtn() }}><RxCross2 /></button>
      </div>
     

      <ul className={classes.sidebar_ul}>
      {permissions.includes('Attendance') && <li>
      <NavLink onClick={() => { props.onSideberBtn() }} to={'/all_attendence'} className={`${classes.sidebar_a} ${location.pathname.includes('attendence_history') ? 'active' : ''}`} ><img src={Attendence} alt="" /> All Attendance</NavLink>
        </li>}
        {permissions.includes('Attendance') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/'} className={`${classes.sidebar_a} ${location.pathname.includes('attendence_approval') ? 'active' : ''}`} ><img src={Attendence} alt="" /> Attendance Approvals<PendingIcon table_name={'attendance_approval'}></PendingIcon></NavLink>
        </li>}
        <li>
        <NavLink onClick={() => { props.onSideberBtn() }} to={'/expense_approvals'} className={`${classes.sidebar_a} ${location.pathname.includes('expense') ? 'active' : ''}`}><img src={Check} alt="" />Expense Approvals<PendingIcon table_name={'expenses'}></PendingIcon></NavLink>
        </li>
        
        {permissions.includes('Employee Detail') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/employee_details'} className={`${classes.sidebar_a} ${location.pathname.includes('employee')||location.pathname.includes('add_employee')||location.pathname.includes('edit_employee') ? 'active' : ''}`}><img src={Wallet} alt="" />Employee Details</NavLink>
        </li>}
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/leave_management'} className={`${classes.sidebar_a} ${location.pathname.includes('leave') ? 'active' : ''}`}><img src={Chart} alt="" /> Leave Management<PendingIcon table_name={'leaves'}></PendingIcon></NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/loan_emi'} className={`${classes.sidebar_a} ${location.pathname.includes('loan') ? 'active' : ''}`} ><img src={Chart} alt="" /> Loan EMI<PendingIcon table_name={'loan'}></PendingIcon></NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/advance'} className={`${classes.sidebar_a} ${location.pathname.includes('advance') ? 'active' : ''}`} ><img src={Chart} alt="" />Advance<PendingIcon table_name={'advance'}></PendingIcon></NavLink>
        </li>
        {permissions.includes('Fine Management') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/fine_management'} className={`${classes.sidebar_a} ${location.pathname.includes('fine') ? 'active' : ''}`}><img src={Chart} alt="" />Fine Management<PendingIcon table_name={'fines'}></PendingIcon></NavLink>
        </li>}
        {permissions.includes('Salary') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/salary_details'} className={`${classes.sidebar_a} ${location.pathname.includes('salary_detail') ? 'active' : ''}`}><img src={Wallet} alt="" />Salary Details<PendingIcon table_name={'salaries'}></PendingIcon></NavLink>
        </li>}
        {permissions.includes('Salary') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/salary_summary'} className={`${classes.sidebar_a} ${location.pathname.includes('salary_summary_details') ? 'active' : ''}`}><img src={Wallet} alt="" />Salary Summary</NavLink>
        </li>}
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/employee_transfer'} className={classes.sidebar_a}><img src={Arrows} alt="" />Employee Transfer</NavLink>
        </li> */}
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/interviews'} className={`${classes.sidebar_a} ${location.pathname.includes('interview') ? 'active' : ''}`}><img src={Tie} alt="" />Interviews<PendingIcon table_name={'interview'}></PendingIcon></NavLink>
        </li>
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/grade'} className={classes.sidebar_a}><img src={Tie} alt="" />Grade</NavLink>
        </li> */}
        {permissions.includes('Timing Approval') && <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/timing_approvals'} className={`${classes.sidebar_a} ${location.pathname.includes('timming') ? 'active' : ''}`}><img src={Clock} alt="" />Timing Approvals<PendingIcon table_name={'timing_approval'}></PendingIcon></NavLink>
        </li>}
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/roles'} className={classes.sidebar_a}><img src={User} alt="" />Roles</NavLink>
        </li> */}
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/bonus'} className={classes.sidebar_a}><img src={Report} alt="" />Bonus</NavLink>
        </li> */}
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/report'} className={classes.sidebar_a}><img src={Report} alt="" />Report</NavLink>
        </li> */}
        {/* <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/hierarchy'} className={classes.sidebar_a}><img src={Report} alt="" />Hierarchy</NavLink>
        </li> */}
        
      </ul>
    </div>
  )
}

export default Sidebar