import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { baseURL } from '../../util'
const AddLoanModal = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const [modal, setModal] = useState(false)
    const [loan, setLoan] = useState(null)
    const [tenure, setTenure] = useState(null)
    const [approval_head, setApprovalHead] = useState(null)
    const [recall_head, setRecallHead] = useState(false)
    const [document, setDocument] = useState(null)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }
    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }
    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }
    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])
    function approveHandler(e) {
        e.preventDefault();
        const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
        axios.post(baseURL + "api/addLeave", {
            employee_id: props.Obj.employee_id,
            from_date: from_date,
            to_date: to_date,
            download: document,
            recall_head: recall_head,
            head_approval: approval_head === 'Yes' ? 1 : 0
        }, { headers }).then((response) => {
            if (response) {
                setModal(false)
            }
        })
    }
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Add Loan</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <form onSubmit={approveHandler} className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Id <span>{props.Obj.empID}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                <div className={classes.modal_data_div}>Head Employee<span>{props.SuperVisor}</span></div>
                <div className={classes.modal_data_div}>Loan <span><input type="text" value={loan} onInput={(e) => setLoan(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Loan Tenure <span><input type="text" value={tenure} onInput={(e) => setTenure(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Approval By Head<span><input value={approval_head} onInput={(e) => setApprovalHead(e.target.value)} type="text" /></span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile fileHandler={newFile} /></span></div>
                <div className={classes.modal_data_div} value={recall_head} >Recall Head<span><input type="checkbox" onChange={recallHandler} /></span></div>
                <div className={classes.modal_data_div} onChange={e => setSelectValue(e.target.value)} >Select Date<span>
                    <select className={classes.loan_select}>
                        <option selected value='1'>Janaury</option>
                        <option value='2'>February</option>
                        <option value='3'>March</option>
                        <option value='4'>April</option>
                        <option value='5'>May</option>
                        <option value='6'>June</option>
                        <option value='7'>July</option>
                        <option value='8'>August</option>
                        <option value='9'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select> </span></div>
                <div className={classes.modal_btn_container}>
                    <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                    <button type="submit" className={classes.modal_btn2} >Approve Leave</button>
                </div>
            </form>
        </Modal>
    )
}
export default AddLoanModal