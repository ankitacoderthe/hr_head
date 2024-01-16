import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
const EmployeeTransferModal = (props) => {
    const [modal, setModal] = useState(false)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }
    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Employee Transfer</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Id <span>{props.Obj.id}</span></div>
                <div className={classes.modal_data_div}>Chnage Floor <span><input type="text" /></span></div>
                <div className={classes.modal_data_div}>Chnage location <span><input type="text" /></span></div>
                <div className={classes.modal_data_div}>Chnage Department <span><input type="text" /></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Approve</button>
            </div>
        </Modal>
    )
}
export default EmployeeTransferModal