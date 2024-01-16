import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
const OutModal = (props) => {
    const [modal, setModal] = useState(false)
    const closeHandler = () => {
        setModal(false)
        props.func(false)
    }
    useEffect(() => {
        setModal(props.value)
    }, [props.value, props.Obj])
    return (
        <Modal wd={'400px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Out Slip</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Id <span>{props.Obj.id}</span></div>
                <div className={classes.modal_data_div}>Time <span>30 Mins</span></div>
                <div className={classes.modal_data_div}>Reasons
                    <div className={classes.modal_input_container}>
                        <input type="radio" name="inp" id="inp1" />
                        <label htmlFor="inp1">Reasons</label>
                        <input type="radio" name="inp" id="inp2" />
                        <label htmlFor="inp2">Reasons</label>
                        <input type="radio" name="inp" id="inp3" />
                        <label htmlFor="inp3">Reasons</label>
                        <input type="radio" name="inp" id="inp4" />
                        <label htmlFor="inp4">Reasons</label>
                    </div>
                </div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Out</button>
            </div>
        </Modal>
    )
}
export default OutModal