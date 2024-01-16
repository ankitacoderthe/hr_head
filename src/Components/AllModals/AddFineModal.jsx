import classes from './AllModals.module.css'
import Modal from '../Modal/Modal.jsx'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
import { baseURL } from '../../util'
const AddFineModal = (props) => {

    const [modal, setModal] = useState(false)
    const [text, setText] = useState('')
    const cookies = new Cookies()
    const token = cookies.get('hr_head_token')
    const [fine, setFine] = useState('')

    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }

    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])

    const formData = {
        employee_id: props.Obj.employee_id,
        amount: fine,
        reason: text
    }
    const reqConfig = {
        url: baseURL+'api/addFine',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    }
    const { isLoading, sendRequest } = useHttp()

    const formHandler = (e) => {
        e.preventDefault()
        sendRequest(reqConfig)
        setText('')
        closeHandler()
        props.reloadFunc()
    }






    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Fine Slip</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <form onSubmit={formHandler} className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>{props.SuperVisor}</span></div>
                <div className={classes.modal_data_div}>Fine<span><input type="text" value={fine} onChange={e => setFine(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Reason<span><textarea onChange={e => setText(e.target.value)} value={text} placeholder='Type Here...'></textarea></span></div>
                <div className={classes.modal_btn_container}>
                    <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                    <button type='submit' className={classes.modal_btn2} disabled={isLoading}>{isLoading ? 'Loading..' : 'Send Approvals To Admin'}</button>
                </div>
            </form>
        </Modal>
    )
}

export default AddFineModal