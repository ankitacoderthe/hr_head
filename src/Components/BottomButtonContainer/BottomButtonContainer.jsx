import { useNavigate } from 'react-router-dom'
import classes from './BottomButtonContainer.module.css'
const BottomButtonContainer = (props) => {
  const navigate = useNavigate();
  const backHandler = () => {
    return navigate(-1)
  }
  return (
    <div className={classes.btn_container}>
      {!props.noCancel ? <button type='button' disabled={props.disabled} className={classes.cancel} onClick={props.func === true ? () => props.cancelRequests() : backHandler}>{props.cancel}</button> : null}
      {props.func2 && <button className={classes.accept} disabled={props.disabled} onClick={props.func && props.func === true ? props.func2 : ''}>{props.approve}</button>}
      {props.f1 && <button type={props.f1 == true ? 'submit' : 'button'} disabled={props.disabled} className={classes.accept}>{props.approve}</button>}
    </div>
  )
}
export default BottomButtonContainer