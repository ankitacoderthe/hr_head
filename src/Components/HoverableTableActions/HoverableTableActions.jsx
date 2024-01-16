import classes from './HoverableTableActions.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const HoverableTableActions = (props) => {

  const [view, setView] = useState(false)


  const clickHandler = () => {
    props.onClickFunc(props.Element)
  }

  return (
    <div className={classes.hoverable_actions}>
      <form onClick={() => { setView(true) }}>...</form>
      <ul style={view === true ? { display: 'block' } : { display: "none" }}>
        {props.Btn === true &&
          <li><div onClick={clickHandler} className={classes.hoverable_links}>{props.t3 ? props.t3 : 'Approve'}</div></li>}
        {props.link1 !== false &&
          <li><Link className={classes.hoverable_links} to={props.link1}>{props.t1 ? props.t1 : 'Approve'}</Link></li>
        }
        {
          props.link2 !== false &&
          <li><Link className={classes.hoverable_links} to={props.link2}>{props.t2 ? props.t2 : 'Details'}</Link></li>}
        {props.link4 !== false ? <li><Link className={classes.hoverable_links} to={props.link4}>{props.t4 ? props.t4 : 'Details'}</Link></li> : ''}

      </ul>
    </div>
  )
}

export default HoverableTableActions