import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../util'
const InterviewModal = (props) => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    const [modal, setModal] = useState(false)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }
    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])
    function makePermanent() {
        axios.patch(baseURL + 'api/updateInterview/' + props.Obj.id, {
            status: "Permanent"
        }, { headers }).then((response) => {
            if (response) {
                navigate('/add_employee')
            }
        })
    }
    function reject() {
        axios.patch(baseURL + 'api/updateInterview/' + props.Obj.id, {
            status: "Reject"
        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
            }
        })
    }
    function makeTrial() {
        axios.patch(baseURL + 'api/updateInterview/' + props.Obj.id, {
            status: "Trial"
        }, { headers }).then((response) => {
            if (response) {
                navigate('/add_employee')
            }
        })
    }
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Interview Details</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Hired By <span>{props.Obj.hired_by}</span></div>
                <div className={classes.modal_data_div}>Department <span>{props.Obj.department_name}</span></div>
                <div className={classes.modal_data_div}>Father Name <span>{props.Obj.fathers_name}</span></div>
                <div className={classes.modal_data_div}>Interview Date <span>{props.Obj.date_time}</span></div>
                <div className={classes.modal_data_div}>Experience <span>{props.Obj.experience}</span></div>
                <div className={classes.modal_data_div}>Designation <span>{props.Obj.role_name}</span></div>
                <div className={classes.modal_data_div}>Salary Expectation <span>{props.Obj.expected_salary}</span></div>
            </div>
            <div className={props.Obj.status !== 'Pending' ? `${classes.invisible}` : `${classes.modal_btn_container} ${classes.modal_btn_container_spl}`}>
                <button className={classes.modal_btn1} onClick={makePermanent}>Make Permanent</button>
                <button className={classes.modal_btn1} onClick={reject}>Reject</button>
                <button className={classes.modal_btn2} onClick={makeTrial} >Make Trial</button>
            </div>
        </Modal>
    )
}
export default InterviewModal