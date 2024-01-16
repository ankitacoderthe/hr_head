import classes from './DetailsDiv.module.css'
const DetailsDiv = (props) => {
  return (
    <div key={props.num} className={`${classes.details_div} ${props.cls === true ? classes.wd50 : ''} ${props.cls2 === true ? classes.wd100 : ''}`}>
      {props.title}
      <span>{props.value}</span>
    </div>
  )
}
export default DetailsDiv