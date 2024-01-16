import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { baseURL } from '../../util'
const AddLeaveModal = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('hr_head_token')
    const [modal, setModal] = useState(false)
    const [from_date, setFromDate] = useState(null)
    const [to_date, setToDate] = useState(null)
    const [recall_head, setRecallHead] = useState(false)
    const [approval_head, setApprovalHead] = useState(null)
    const [document, setDocument] = useState(null)
    const [fileLabel, setFileLabel] = useState('')
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }
    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }
    const newLabel = (data) => {
        setFileLabel(data.target.value)
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
                setToDate('')
                setFromDate('')
                setDocument('null')
                setApprovalHead('No')
                setFileLabel('')
                setRecallHead(true)
                closeHandler()
                props.reloadFunc()
            }
        })
    }
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Add Leave</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <form onSubmit={approveHandler} className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                <div className={classes.modal_data_div}>Head Employee<span>{props.SuperVisor}</span></div>
                <div className={classes.modal_data_div}>Leave from <span><input value={from_date} placeholder="DD/MM/YYYY" onInput={(e) => setFromDate(e.target.value)} type="date" /></span></div>
                <div className={classes.modal_data_div}>Leave to <span><input type="date" placeholder="DD/MM/YYYY" value={to_date} onInput={(e) => setToDate(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Approval By Head<span>
                    <select onChange={e => setApprovalHead(e.target.value)} className={classes.loan_select}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>
                </span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile label={fileLabel} labelFunc={setFileLabel} fileHandler={newFile} /></span></div>
                <div className={classes.modal_data_div} value={recall_head} >Recall Head<span><input type="checkbox" onChange={recallHandler} /></span></div>
                <div className={classes.modal_btn_container}>
                    <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                    <button type="submit" className={classes.modal_btn2} >Approve Leave</button>
                </div>
            </form>
        </Modal>
    )
}
export default AddLeaveModal