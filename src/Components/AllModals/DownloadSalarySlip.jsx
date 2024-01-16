import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import { useNavigate } from 'react-router-dom'
const DownloadSalarySlip = (props) => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [month, setMonth] = useState(null)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }
    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])
    const openDownload = () => {
        navigate("/salary_slip/" + month + "/" + props.Obj.employee_id)
    }
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Download Salary Slip</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                {/* <div className={classes.modal_data_div}>Floor Incharge<span>{props.Obj.head_employees_result}</span></div> */}
                <div className={classes.modal_data_div}>Select Month
                    <div className={classes.modal_input_container}>
                        <input type="radio" name="inp" id="inp1" value={1} onInput={(e) => setMonth(e.target.value)} />
                        <label htmlFor="inp1" >1 month</label>
                        <input type="radio" name="inp" id="inp2" value={3} onInput={(e) => setMonth(e.target.value)} />
                        <label htmlFor="inp2">3 Months</label>
                        <input type="radio" name="inp" id="inp3" value={6} onInput={(e) => setMonth(e.target.value)} />
                        <label htmlFor="inp3">6 Months</label>
                        <input type="radio" name="inp" id="inp4" value={12} onInput={(e) => setMonth(e.target.value)} />
                        <label htmlFor="inp4">12  Months</label>
                    </div>
                </div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2} onClick={openDownload}>Download</button>
            </div>
        </Modal>
    )
}
export default DownloadSalarySlip