import classes from './HeaderTile.module.css'
import { Link } from 'react-router-dom'
const HeaderTile = (props) => {
  return (
    <div className={classes.header_tile}>
      <Link className={classes.link}  to={props.link}>
      <div className={classes.header_tile_link}>{props.title}</div>
      <h1>{props.value}</h1>

      {/* Here if we focus carefully, we are getting a prop called num (props.num)
        according to the prop value className is decided. */}
      {props.num !== undefined &&
        <div
          className={`${classes.header_colored_div} ${props.num < 0 ? classes.red : classes.green}`}>
          {/* If the prop value num is less than < 0 then neeative sign comes in action */}
          {props.num < 0 ? '- ' : '+ '}

          {/* Basically this line of code converting -ve numbver into positive because sign is depend upon nm value in the above line of code */}
          {props.num < 0 ? props.num * -1 : props.num} From Last Day
        </div>
      }
      </Link>
    </div>
  )
}

export default HeaderTile