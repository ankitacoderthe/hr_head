import React, { useState,useEffect } from 'react'
import classes from './NotificationBox.module.css'
import img from '../../../assets/notification.png'


const NotificationBox = (props) => {

    const [modalVisibility, setModalVisibility] = useState(false)

const[modalObj,setModalObj]=useState(null)


const setModal=(obj)=>{
setModalObj(obj)
    setModalVisibility(!modalVisibility)
}
    return (

        <React.Fragment>
            <div style={props.visibility === true ? { display: 'block' } : { display: 'none' }} onClick={e => props.overlayFunc(!props.visibility)} className={classes.overlay}></div>
            <div style={props.visibility === true ? { display: 'block' } : { display: 'none' }} className={classes.notification_box}>
             {props.notifications&&props.notifications.map((element,index)=>{
              return (
                <div className={classes.notification_div} key={index}>
                <img src={img} alt="notification icon" />
                <h3>{element?.name}</h3>
                <h3>{element?.created_at?.split(" ")[0].split("-").reverse().join("-")}</h3>
                <h3>{element?.created_at?.split(" ")[1].split(".")[0]}</h3>
                <button onClick={()=>setModal(element)}>View</button>
            </div>
              )}
             ) }
            </div>

            <div style={modalVisibility === true ? { display: 'block' } : { display: 'none' }} className={classes.notification_modal}>
                <h3>{modalObj?.name}</h3>
                <p>
                    {modalObj?.text}
                </p>
                <button onClick={()=>setModalVisibility(!modalVisibility)} >Okay</button>
            </div>
        </React.Fragment>
    )
}

export default NotificationBox
