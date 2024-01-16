import classes from './Modal.module.css'

const Modal = (props) => {

const isModal = props.isModal 

  return (
    <>
    <div className={`${classes.backdrop} ${isModal === true ? classes.show : ''}`}></div>
    <div style={{width:props.wd}} className={`${classes.modal} ${isModal === true ? classes.show : ''}`}>
      {props.children}
    </div>
    </>
  )}


export default Modal


