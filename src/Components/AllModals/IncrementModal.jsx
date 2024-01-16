import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import LabeledSelect from "../LabeledSelect/LabeledSelect"
import LabeledInput from '../LabeledInput/LabeledInput'
import moment from 'moment'
import { baseURL } from '../../util'
const IncrementModal = (props) => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('hr_head_token')
    const headers = { "Authorization": "Bearer " + token }
    const [modal, setModal] = useState(false)
    const [increment, setIncrement] = useState(null)
    const [type, setType] = useState(null)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }

    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])


    const add = () => {
        axios.post(baseURL + "api/incrementSalary", {
            employee_id: props.Obj.id,
            amount: increment,
            type: type,
            date: moment().format("YYYY:MM:DD HH:mm:ss")
        }, { headers }).then((response) => {
            if (response.status === 200) {
                props.func()
                cancel()
            }
        })
    }
    const cancel = () => {
        setIncrement(' ')
        setType('')
        closeHandler()
    }
    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Add Increment </h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Base Salary <span>{props.Obj.amount}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}({props.Obj.store_department_name} section)</span></div>
                <LabeledSelect data={[{ name: "Flat Pay" }, { name: "Percentage" }]} selectedVal={setType} selectId={'mode_of_increment'} title={'Increment Type'} value={type} ></LabeledSelect>
                <LabeledInput cls={'wd50'} img={false} title={'Amount'} value={increment} func2={(data) => setIncrement(data)} type={'number'} id={'increment_amount'} />
            </div>
            <div style={{ justifyContent: "flex-end" }} className={`${classes.modal_btn_container} ${classes.modal_btn_container_spl}`}>
                <button className={classes.modal_btn1} onClick={cancel}>Cancel</button>
                <button style={{ marginLeft: '10px' }} className={classes.modal_btn2} onClick={add}>Add</button>
            </div>
        </Modal>
    )
}

export default IncrementModal